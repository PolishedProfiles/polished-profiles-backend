const { app, start } = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
const { coverLetter } = require('../coverLetter');
let getResume = require('../resumeGenerator');
const axios = require('axios');
const fs = require('fs');
const express = require('express');
const { createChatCompletionMock } = jest.requireMock('openai');


let token;

describe('server', () => {
  describe('start', () => {
    it('should start the server', () => {
      start(3000);
    });
  });
  describe('post', () => {
    it('should post to the server', () => {
      request
        .post('/api/updatedResume')
        .send({ originalResume: 'test', jobDescription: 'test' })
        .expect(200);
    });
  });
});


describe('POST /api/resume', () => {
  it('should process the resume and return a response with the processed resume', async () => {
    const app = express();
    app.use(express.json());
    app.post('/api/resume', async (req, res) => {
      const resume = await getResume(req.body.toString());
      res.status(200).send(resume);
    });
    const reqBody = 'Ash, Software Engineer';
    const response = await request.post('/api/resume').send(reqBody);
    expect(response.status).toBe(200);
  });
});

jest.mock('openai', () => {
  const createChatCompletionMock = jest.fn().mockResolvedValue({
    data: {
      choices: [
        {
          message: {
            content: 'EDITED COVER LETTER',
          },
        },
      ],
    },
  });
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => {
      return {
        createChatCompletion: createChatCompletionMock,
      };
    }),
    __esModule: true,
    createChatCompletionMock,
  };

});



describe('coverLetter function', () => {
  it('should create cover letter ', async () => {
    const actual_resume = 'My current resume';
    const job_description = 'Job description for a new position';
    await coverLetter(actual_resume, job_description);
    expect(createChatCompletionMock).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'A resume and a job description will be provided to you and you will return a cover letter.',
        },
        {
          role: 'user',
          content: '[MY RESUME]\n\n' + actual_resume + '\n\n[JOB DESCRIPTION]\n\n' + job_description,
        },
      ],
      temperature: 0,
    });
  });
});

describe('getResume function', () => {
  it('should create resume ', async () => {
    let response = await request.post('/api/resume').send({ originalResume: 'test', jobDescription: 'test' });
    expect(response.status).toBe(200);
    expect(response.text).toEqual('test');
  });
});

// describe('/api/pdf', () => {
//   it('get pdf return resume ', async () => {
//     let response = await request.post('/api/pdf');
//     // expect(mockResume).toHaveBeenCalled();
//     expect(response.status).toBe(400);
//     // expect(response.text).toEqual('test');
//   });
// });


