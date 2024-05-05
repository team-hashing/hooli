
const { generateContent } = require('./gemini-api');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');


app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
});
/*
app.get('/generate', async (req, res) => {
	const text = req.query.text;
	const response = await generateContent(text);
	res.send(response);
});
*/
var admin = require("firebase-admin");

var serviceAccount = require("../firebase_admin.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
app.use(express.json());


const _calculatePoints = (activities) => {
    // Initialize scores for each category
    let scores = {
        transport: 0,
        food: 0,
        energy: 0,
        waste: 0,
        water: 0,
        health: 0
    };

    // For each activity, add points to the corresponding category
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].eco_friendly) {
            scores[activities[i].category] += 10;
        } else {
            scores[activities[i].category] -= 10;
        }
    }

    return scores;
}

const _checkForMedals = async (userRef) => {
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    // Define medals and their requirements
    const medals = {
        medal_transport: { category: 'transport', score: 10 },
        medal_food: { category: 'food', score: 10 },
        medal_energy: { category: 'energy', score: 10 },
        medal_waste: { category: 'waste', score: 10 },
        medal_water: { category: 'water', score: 10 },
        medal_health: { category: 'health', score: 10 },
        medal_multi_category: { score: 50 },
        medal_challenge_master: { completedChallenges: 10 },
        medal_beginner: { score: 1 }
    };

    // Check each medal
    for (const medal in medals) {
        const { category, score, completedChallenges } = medals[medal];

        // If the user doesn't have the medal and meets the requirements, award the medal
        if (!userData.medals.includes(medal)) {
            if (category && userData.scores[category] >= score) {
                await userRef.update({ medals: admin.firestore.FieldValue.arrayUnion(medal) });
            } else if (completedChallenges && userData.completedChallenges >= completedChallenges) {
                await userRef.update({ medals: admin.firestore.FieldValue.arrayUnion(medal) });
            } else if (score) {
                // Check if the user has a score of 50 in any two categories
                let categoriesWithScore50 = 0;
                for (const category in userData.scores) {
                    if (userData.scores[category] >= score) {
                        categoriesWithScore50++;
                    }
                }
                if (categoriesWithScore50 >= 2) {
                    await userRef.update({ medals: admin.firestore.FieldValue.arrayUnion(medal) });
                }
            }
        }
    }
}

const _checkStreak = (lastDate) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return lastDate === yesterday.toISOString().split('T')[0];
}

const _addStreak = async (userRef) => {
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    const today = new Date().toISOString().split('T')[0];
    if (_checkStreak(userData.lastDate)) {
        await userRef.update({
            streak: admin.firestore.FieldValue.increment(1),
            lastDate: today
        });
    } else {
        await userRef.update({
            streak: 1,
            lastDate: today
        });
    }
}

app.post('/generate', async (req, res) => {
    const text = req.body.text;
    const userId = req.body.userId;
    const response = await generateContent(text);

    // Add unique IDs to activities and future challenges
    if (response.activities) {
        response.activities = response.activities.map(activity => ({ id: uuidv4(), ...activity }));
    }
    if (response.future_challenges) {
        response.future_challenges = response.future_challenges.map(challenge => ({ id: uuidv4(), isCompleted: false, ...challenge }));
    }

    // Calculate points from activities
    let scores = {
        transport: 0,
        food: 0,
        energy: 0,
        waste: 0,
        water: 0,
        health: 0
    };
    if (!response.activities) {
        response.activities = [];
    } else {
        scores = _calculatePoints(response.activities);
    }

    // Save the response as an "experience" object for the user
    const userRef = db.collection('users').doc(userId);
    const experienceRef = db.collection('experiences').doc(uuidv4());
    await experienceRef.set({
        id: experienceRef.id,
        user: userRef,
        date: new Date().toISOString().split('T')[0],
        ...response,
    });

    // Update user's scores
    for (const category in scores) {
        await userRef.update({ [`scores.${category}`]: admin.firestore.FieldValue.increment(scores[category]) });
    }
    
    try {
        // Check for medals
        await _checkForMedals(userRef);
    } catch (error) {
        console.error('Error checking for medals:', error);
    }

    try {
        // Add streak
        await _addStreak(userRef);
    } catch (error) {
        console.error('Error adding streak:', error);
    }


    res.send(response);
});


app.post('/getExperiences', async (req, res) => {
	const userId = req.body.userId;

	// Get a reference to the user
	const userRef = db.collection('users').doc(userId);

	// Query the experiences collection for experiences where the user field is equal to the user reference
	const snapshot = await db.collection('experiences').where('user', '==', userRef).get();

	// Map over the documents in the snapshot to get the data for each experience
	const experiences = snapshot.docs.map(doc => doc.data());

	// Send the experiences as the response
	res.send(experiences);
});

app.post('/getExperiencesByDate', async (req, res) => {
    const { userId, date } = req.body;

	const targetDate = date;

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    // Query the experiences collection for experiences where the user field is equal to the user reference
    // and the date field is equal to the target date
	// Query the experiences collection for experiences where the user field is equal to the user reference
	const snapshot = await db.collection('experiences').where('user', '==', userRef).where('date', '==', targetDate).get();

    // Map over the documents in the snapshot to get the data for each experience
    const experiences = snapshot.docs.map(doc => doc.data());

    // Send the experiences as the response
    res.send(experiences);
});

app.post('/deleteChallenge', async (req, res) => {
    const { userId, experienceId, challengeId } = req.body;

    if (typeof userId !== 'string' || userId === '') {
        res.status(400).send('Invalid userId');
        return;
    }

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    // Get the specific experience of the user based on experienceId
    const experienceRef = db.collection('experiences').doc(experienceId);
    const experienceSnapshot = await experienceRef.get();

    if (!experienceSnapshot.exists) {
        res.status(404).send('Experience not found');
        return;
    }

    const experience = experienceSnapshot.data();

    // Check if the experience contains the challenge with the given challengeId
    const challengeIndex = experience.future_challenges.findIndex(challenge => challenge.id == challengeId);



    if (challengeIndex !== -1) {
        // The experience contains the challenge, remove it
        experience.future_challenges.splice(challengeIndex, 1);

        // Update the experience document with the new future_challenges array
        await experienceRef.update({ future_challenges: experience.future_challenges });

        res.send({ message: 'Challenge deleted successfully' });
        return;
    }

    res.status(404).send('Challenge not found');
});


app.post('/completeChallenge', async (req, res) => {
    const { userId, experienceId, challengeId } = req.body;

    if (typeof userId !== 'string' || userId === '') {
        console.log("Invalid userId");
        res.status(400).send('Invalid userId');
        return;
    }

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    // Get the specific experience of the user based on experienceId
    const experienceRef = db.collection('experiences').doc(experienceId);
    const experienceSnapshot = await experienceRef.get();

    if (!experienceSnapshot.exists) {
        res.status(404).send('Experience not found');
        return;
    }

    const experience = experienceSnapshot.data();

    // Check if the experience contains the challenge with the given challengeId
    const challengeIndex = experience.future_challenges.findIndex(challenge => challenge.id == challengeId);

    if (challengeIndex !== -1) {
        // The experience contains the challenge, set isCompleted to true
        experience.future_challenges[challengeIndex].isCompleted = true;

        // Update the experience document with the new future_challenges array
        await experienceRef.update({ future_challenges: experience.future_challenges });

        // Increment completedChallenges in Firestore
        await userRef.update({ completedChallenges: admin.firestore.FieldValue.increment(1) });

        res.send({ message: 'Challenge marked as completed successfully' });
        return;
    }

    res.status(404).send('Challenge not found');
});

app.post('/incompleteChallenge', async (req, res) => {
    const { userId, experienceId, challengeId } = req.body;

    if (typeof userId !== 'string' || userId === '') {
        res.status(400).send('Invalid userId');
        return;
    }

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    // Get the specific experience of the user based on experienceId
    const experienceRef = db.collection('experiences').doc(experienceId);
    const experienceSnapshot = await experienceRef.get();

    if (!experienceSnapshot.exists) {
        res.status(404).send('Experience not found');
        return;
    }

    const experience = experienceSnapshot.data();

    // Check if the experience contains the challenge with the given challengeId
    const challengeIndex = experience.future_challenges.findIndex(challenge => challenge.id == challengeId);

    if (challengeIndex !== -1) {
        // The experience contains the challenge, set isCompleted to false
        experience.future_challenges[challengeIndex].isCompleted = false;

        // Update the experience document with the new future_challenges array
        await experienceRef.update({ future_challenges: experience.future_challenges });

        // Decrement completedChallenges in Firestore
        await userRef.update({ completedChallenges: admin.firestore.FieldValue.increment(-1) });

        res.send({ message: 'Challenge marked as incomplete successfully' });
        return;
    }

    res.status(404).send('Challenge not found');
});

app.post('/getUserAttributes', async (req, res) => {
    const userId = req.body.userId;

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    try {
        // Get the user document
        const userSnapshot = await userRef.get();

        // Check if the user exists
        if (!userSnapshot.exists) {
            res.status(404).send('User not found');
            return;
        }

        // Get the user data
        const userData = userSnapshot.data();

        // Extract the attributes
        const { completedChallenges, streak, medals, scores } = userData;

        // Send the attributes as the response
        res.send({ completedChallenges, streak, medals, scores });
    } catch (error) {
        console.error('Error getting user attributes:', error);
        res.status(500).send('Error getting user attributes');
    }
});