const express = require('express');
const { updatedResume } = require('./updatedResume');
const { getResume } = require('./resumeGenerator');
const { coverLetter } = require('./coverLetter');

const { users }  = require('./models/index');

const app = express();
require('dotenv').config();
// const dotenv = require('dotenv');


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.text());

// add an api to get the resume from the request body and then call resumeGenerator
app.post('/api/resume', async (req, res) => {
  console.log(req.body.toString());
  const resume = await getResume(req.body.toString());

  res.send(resume);
});


app.post('/api/updatedResume', async (req, res) => {
  const originalResume = req.body.originalResume;
  const jobDescription = req.body.jobDescription;
  const cleanedupResume = await getResume(originalResume);
  const finalResume = await updatedResume(cleanedupResume, jobDescription);


  res.send(finalResume);
});

app.post('/api/coverLetter', async (req, res) => {
  const originalResume = req.body.originalResume;
  const jobDescription = req.body.jobDescription;
  const cleanedupResume = await getResume(originalResume);
  const finalCoverLetter = await coverLetter(cleanedupResume, jobDescription);
  
  res.send(finalCoverLetter);
});

// app.post('/api/test', async (req, res) => {
//   // const testJSON = req.body;
//   let newUser = await users.create({

//     username: 'test3',
//     token: 'test3',
//     originalResume: 'test3',
//     generatedResumes: req.body,
//   });
//   res.send(newUser);
// });



const start = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {app, start}

