const express = require('express');

const { users } = require('./models/index');

const { updatedResume } = require('./updatedResume');
const { getResume } = require('./resumeGenerator');
const { coverLetter } = require('./coverLetter');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const verifyUser = require('./auth');

const app = express();
require('dotenv').config();
// const dotenv = require('dotenv');


const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(fileUpload());
// app.use(verifyUser);

// getting history back?
// app.get('/history', verifyUser, (req, res, next) => {
//   res.status(200).send({ message: 'success' });
// });

// add an api to get the resume from the request body and then call resumeGenerator
app.post('/api/resume', async (req, res) => {
  console.log(req.body.toString());
  const resume = await getResume(req.body.toString());

  res.status(200).send(resume);
});

app.post('/api/pdf', async (req, res) => {
  if (!req.files && !req.files.resume) {
    res.status(400).send('No file attached');
  }

  let pdfText = await pdfParse(req.files.resume).then(result => result.text);
  console.log(pdfText);
  const resume = await getResume(pdfText);
  res.send(resume);
})


app.post('/api/updatedResume', async (req, res) => {
  const originalResume = req.body.originalResume;
  const jobDescription = req.body.jobDescription;
  const cleanedupResume = await getResume(originalResume);
  const finalResume = await updatedResume(cleanedupResume, jobDescription);


  res.send(finalResume);
});

app.post('/api/updatedPdf', async (req, res) => {
  const originalResume = await pdfParse(req.files.resume).then(result => result.text);
  const jobDescription = req.files.jobDescription;
  const cleanedupResume = getResume(originalResume);
  const finalResume = updatedResume(cleanedupResume, jobDescription);

  res.send(updatedResume);
});

app.post('/api/coverLetter', async (req, res) => {
  const originalResume = req.body.resume;
  const jobDescription = req.body.jobDescription;
  console.log(req.body);
  const email = req.body.email;
  console.log(originalResume);
  const cleanedupResume = await getResume(originalResume);
  const finalCoverLetter = await coverLetter(cleanedupResume, jobDescription);

  let verifiedUser;

  try {
    verifiedUser = await users.findOne({ where: { email } });

  } catch (error) {
    verifiedUser = false;
  }
  if (verifiedUser) {
    let resumeArray = verifiedUser.generatedResumes;
    let parsedResumeArray = JSON.parse(resumeArray);
    parsedResumeArray.push({ resume: cleanedupResume, coverLetter: finalCoverLetter });
    let updatedResumeArray = JSON.stringify(parsedResumeArray);
    verifiedUser.generatedResumes = updatedResumeArray;

    // Update the user with the new generatedResumes
    let updatedUser = await verifiedUser.update({ generatedResumes: updatedResumeArray });
  } else {
    let newUser = await users.create({
      email: req.body.email,
      originalResume: originalResume,
      generatedResumes: JSON.stringify([{ resume: cleanedupResume, coverLetter: finalCoverLetter }]),
    });
    console.log('newUser', newUser, newUser.email);
  }

  let response = { coverLetter: finalCoverLetter, resume: cleanedupResume };
  res.send(response);
});

app.post('/api/coverLetterPdf', async (req, res) => {
  const originalResume = await pdfParse(req.files.resume).then(result => result.text);
  const jobDescription = req.body.jobDescription;
  const cleanedupResume = await getResume(originalResume);
  const finalCoverLetter = await coverLetter(cleanedupResume, jobDescription);

  console.log(req.body.email);
  let verifiedUser = await users.findOne({ where: { email: req.body.email } });
  if (verifiedUser) {
    let resumeArray = verifiedUser.generatedResumes;
    let parsedResumeArray = JSON.parse(resumeArray);
    parsedResumeArray.push({ resume: cleanedupResume, coverLetter: finalCoverLetter });
    let updatedResumeArray = JSON.stringify(parsedResumeArray);
    verifiedUser.generatedResumes = updatedResumeArray;

    // Update the user with the new generatedResumes
    let updatedUser = await verifiedUser.update({ generatedResumes: updatedResumeArray });
  } else {
    let newUser = await users.create({
      email: req.body.email,
      originalResume: originalResume,
      generatedResumes: JSON.stringify([{ resume: cleanedupResume, coverLetter: finalCoverLetter }]),
    });
    console.log('newUser', newUser, newUser.email);
  }

  let response = { coverLetter: finalCoverLetter, resume: cleanedupResume };
  res.send(response);
});

app.post('/api/history', async (req, res) => {
  let email = req.body.email;
  let verifiedUser = await users.findOne({ where: { email: email } });

  let userHistory = JSON.parse(verifiedUser.generatedResumes)

  res.send(userHistory);
})




const start = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = { app, start };

