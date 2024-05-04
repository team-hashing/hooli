
const { generateContent } = require('./gemini-api');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');


app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
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


const calculatePoints = (activities) => {
	// if activity.eco_friendly + 10 points, else -10 points
	let points = 0;
	for (let i = 0; i < activities.length; i++) {
		if (activities[i].eco_friendly) {
			points += 10;
		} else {
			points -= 10;
		}
	}
	return points;
}



const db = admin.firestore();
app.use(express.json());


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
    const points = calculatePoints(response.activities);

    // Save the response as an "experience" object for the user
    const userRef = db.collection('users').doc(userId);
    const experienceRef = db.collection('experiences').doc(uuidv4());
    await experienceRef.set({
        id: experienceRef.id,
        user: userRef,
        date: new Date().toISOString().split('T')[0],
        ...response,
    });


    // Update user's points
    await userRef.update({ points: admin.firestore.FieldValue.increment(points) });

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