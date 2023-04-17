const express = require('express');
const app = express();
const pdfParse = require('pdf-parse');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 3001;

const{ getResume } = require('./resumeGenerator');

app.use(cors());  
app.use(express.json());
app.use(express.text());
app.use(fileUpload())

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

app.post('/api/pdf', async (req, res) => {
  console.log('hitting the route')

  if (!req.files && !req.files.resume) {
    console.log('loser')
    res.status(400).send('No file attached');
  }

  pdfParse(req.files.resume).then(result => {
    console.log(result.text);
    res.send(result.text);
  })
})

app.get('/', (req, res) => {
  res.status(200).send('Base Endpoint Proof of Life!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



