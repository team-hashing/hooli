import { HOST } from '@env';

const deleteChallenge = (userId, experienceId, challengeId) => {
    let res = false;

    console.log('userId', userId);
    console.log('experienceId', experienceId);
    console.log('challengeId', challengeId);

    fetch(`http://${HOST}:3000/deleteChallenge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            experienceId: experienceId,
            challengeId: challengeId,
        }),
    })
        .then(response => {
            if (!response.ok) {
                // If the server responds with a status code other than 200, throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'Challenge deleted successfully') {
                // If the challenge was deleted successfully, remove it from the experiences array
                res = true;
            } else {
                // If the server responded with a message other than 'Challenge deleted successfully', log the message
                console.error(data.message);
            }
        })
        .catch(error => console.error(error));

    return res;
};

export default deleteChallenge;