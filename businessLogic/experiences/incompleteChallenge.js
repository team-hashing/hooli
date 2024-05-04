import { HOST } from '@env';

const incompleteChallenge = async (userId, experienceId, challengeId) => {
    try {
        const response = await fetch(`http://${HOST}:3000/incompleteChallenge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                experienceId: experienceId,
                challengeId: challengeId,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default incompleteChallenge;