
const { generateContent } = require('./gemini-api');
const express = require('express');
const app = express();
const port = 3000;

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

app.post('/generate', async (req, res) => {
	const text = req.body.text;
	const userId = req.body.userId;
	const response = await generateContent(text);

	// Save the response as an "experience" object for the user
	const userRef = db.collection('users').doc(userId);
	const experienceRef = db.collection('experiences').doc();
	await experienceRef.set({
		user: userRef,
		...response,
	});

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
	console.log(experiences);
	res.send(experiences);
});

app.post('/deleteChallenge', async (req, res) => {
    const { userId, experienceId } = req.body;

    // Get a reference to the user
    const userRef = db.collection('users').doc(userId);

    // Get a reference to the experience
    const experienceRef = db.collection('experiences').doc(experienceId);

    // Get the experience document
    const experienceDoc = await experienceRef.get();

    // Check if the experience exists and the user is the owner
    if (!experienceDoc.exists || experienceDoc.data().user.id !== userId) {
        res.status(403).send('Unauthorized');
        return;
    }

    // Delete the experience
    await experienceRef.delete();

    res.send({ message: 'Challenge deleted successfully' });
});