const {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI
} = require('@google-cloud/vertexai');

const project = 'hooli-8a670';
const location = 'us-central1';
const textModel =  'gemini-1.0-pro';
const visionModel = 'gemini-1.0-pro-vision';

const vertexAI = new VertexAI({project: project, location: location});

// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generationConfig: {maxOutputTokens: 2048},
  });

const generativeVisionModel = vertexAI.getGenerativeModel({
    model: visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: textModel,
});

const generateContent = async (text) => {
  const request = {
    contents: [
      {
        role: 'user', 
        parts: [
          {
            text: `
              You are an agent of an app that receives texts explaining the daily activities of a person (like diary entries), 
              your job is to get the activities that have something to do with being eco-friendly (and give 
              wether they are good for the environment or bad) and provide and answer in JSON format following 
              the template below containing the activities with their caractheristics and a message either giving 
              kudos or encouraging improvement and future challenges the user can do to improve and be more eco-friendly:
              {
                "message": "response message to the user",
                "activities": [
                  {
                    "activity": "activity name",
                    "activity_description": "activity description",
                    "feedback_message": "feedback message",
                    "eco_friendly": true/false,
                  }
                ],
                "future_challenges": [
                  {
                    "challenge": "challenge name",
                    "challenge_description": "challenge description",
                    "challenge_dificulty": 0/1/2,
                  }
                ],
              }
              REMEMBER TO ONLY ANSWER WITH A WELL STRUCTURED VALID JSON OBJECT, NO MARKDOWN AND NO OTHER TEXT SHOULD BE RETURNED. ANSWER VALUES BE IN SAME LANGUAGE AS REQUEST`
          }
        ]
      },
      {role: 'model', parts: [{text: 'OK I will provide a structured JSON response only with no markdown from now on and following the provided template.'}]},
      {role: 'user', parts: [{text: text}]}
    ],
  };
  const result = await generativeModel.generateContent(request);
  const response = result.response;
  console.log('Response: ', JSON.stringify(response));
  let match = response.candidates[0].content.parts[0].text.match(/{.*}/s);
  let jsonString = match ? match[0] : '{}';

  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    data = {};
  }
  
  console.log('Data: ', data);

  return data;
};






module.exports = { generateContent };