
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

app.get('/generate', async (req, res) => {
  const text = req.query.text;
  const response = await generateContent(text);
  res.send(response);
});
