const express = require('express');
const app = express();
require ('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const{ getResume } = require('./resumeGenerator');

// app.use(express.json());
app.use(express.text());
app.use(cors());

// add an api to get the resume from the request body and then call resumeGenerator
// app.post('/api/resume', async (req, res) => {
//   console.log(req.body.toString());
//   const resume = await getResume(req.body.toString());

//   // send the resume string as a text response
//   res.send(resume);
// });
app.post('/api/resume', async (req, res) => {
  console.log(req.body);
  const resume = await getResume(req.body.toString());
  // set the response headers to allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // send the resume string as a text response
  res.send(resume);
});

app.get('/', (req, res) => {
  res.status(200).send('Base Endpoint Proof of Life!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



