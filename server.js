const express = require('express');
const app = express();
require ('dotenv').config();

const PORT = process.env.PORT || 3001;

const{ getResume } = require('./resumeGenerator');

app.use(express.json());
app.use(express.text());

// add an api to get the resume from the request body and then call resumeGenerator
app.post('/api/resume', async (req, res) => {
  console.log(req.body.toString());
  const resume = await getResume(req.body.toString());

  // send the resume string as a text response
  res.send(resume);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



