import { usersDB } from "../../firebaseConfig";
import { collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

const addUserDetails = async (points, medals, completedChallenges) => {
	try {
		const usersCollection = collection(usersDB, 'users');
		const userDoc = doc(usersCollection, auth.currentUser.uid);
		await setDoc(userDoc, {
			scores: {
				transport: 0,
				food: 0,
				energy: 0,
				waste: 0,
				water: 0,
				health: 0
			},
			medals: medals ? medals : [],
			completedChallenges: completedChallenges ? completedChallenges : 0,
			streak: 0,
			lastUse: new Date().toISOString().split('T')[0],
		});
	} catch (error) {
		console.error("Error adding user details: ", error);
	}
};


const updateUserDetails = async (points, medals, completedChallenges) => {
	try {
		const usersCollection = collection(usersDB, 'users');
		const userDoc = doc(usersCollection, auth.currentUser.uid);
		await setDoc(userDoc, {
			medals: medals ? medals : [],
			completedChallenges: completedChallenges ? completedChallenges : 0,
			streak: 0,
		}, { merge: true });
	} catch (error) {
		console.error("Error updating user details: ", error);
	}
}

export { addUserDetails, updateUserDetails };
