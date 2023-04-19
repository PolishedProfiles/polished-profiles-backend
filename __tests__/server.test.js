const { app, start } = require('../server.js');
const request = require('supertest');
const { coverLetter } = require('../coverLetter');
const { getResume } = require('../resumeGenerator');
const axios = require('axios');
const fs = require('fs');


let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imtfc3dGQTdoNWdveFQ4UER6YzdpNCJ9.eyJnaXZlbl9uYW1lIjoiQnJlbmRhIiwiZmFtaWx5X25hbWUiOiJKIiwibmlja25hbWUiOiJicmVuZGFqMDIxNCIsIm5hbWUiOiJCcmVuZGEgSiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZRURIWFZMUzN0VkdtMTlFY0k1ZVlybnhHVkM3clBIVTBZdndySD1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjMtMDQtMThUMjA6NTU6MjQuMTU4WiIsImVtYWlsIjoiYnJlbmRhajAyMTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LWl4enRmczZqeTIxZW04ZTQudXMuYXV0aDAuY29tLyIsImF1ZCI6ImluQVZmNENlOUlzaUhoR1duY1FLWGdza3RxSXJsdFVUIiwiaWF0IjoxNjgxOTQ3NzMzLCJleHAiOjE2ODE5ODM3MzMsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE4MDM1NzM3MjcwNzQyNzIwOTIzIiwic2lkIjoiZ1F3b2djSXZmWkRTcGQ5Q2s0eXVjb00zZlpMNExuUlAiLCJub25jZSI6ImFFTjVOVmQ1WVZkRFVtaHdUR3RxYWtkYWEwVlhRM3BRV0ZWc1VGSTRkemw2VFhSbFUwZzVNWGhZYmc9PSJ9.KMyFCrWjpEglKmYCRKYyDuKHLmjqm7nJjeJFOMXNg3IMHs4Kerva2R7lh7S3BRAHXCADbUuXQpKBc7cutfJIMLwKgqaFvydXX-mtNY4pDXJFLyrBP4TR4AxiAoFsEOiI4s1lj07icv_0bm-NLhPmYczEHyZYCnMiaIi39PxGv9bTXIkhECMqT73Xr5L1K3gl5oJYn5Kjx8A8wHnwYAsltgKjASo2hYEVQWigUcOdXsm-XJpJcLzQG5NYPXBGvJ88iTDem2R3eYJLEMnYSJkfgvbHui3b2FwfZGl2lxvV_RovOnHBEq5iukOOvhRRxmzupqw_ATf_dPYdlwypLvlgpQ";


describe('server', () => {
  describe('start', () => {
    it('should start the server', () => {
      start(3000);
    });
  });
  describe('post', () => {
    it('should post to the server', () => {
      request(app)
        .post('/api/updatedResume')
        .send({ originalResume: 'test', jobDescription: 'test' })
        .expect(200);
    });
  });
});

describe('Testing API Endpoints', () => {
  // beforeAll(() => {
  //   start(3005); // Start the server on a different port for testing
  // });
  test('GET /history with correct token', async () => {
    const response = await request(app)
      .get('/history')
      .set('Authorization', 'Bearer YOUR_TEST_TOKEN');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'success' });
  });
  it('should return generage Resume back', async () => {
    const res = await request(app).get('/api/resume');
    expect(res).toBeTruthy();
  });
});
  // test('POST /api/resume', async () => {
  //   const requestBody = 'YOUR_SAMPLE_REQUEST_BODY';
  //   const response = await request(app)
  //     .post('/api/resume')
  //     .send(requestBody);
  //   expect(response.statusCode).toBe(200);
  // expect(response.body).toHaveProperty('property_name');
  // Add more assertions based on the expected response structure
  // });
  // test('POST /api/pdf', async () => {
  //   const response = await request(app)
  //     .post('/api/pdf')
  //     .attach('resume', 'path/to/sample/resume.pdf');
  //   expect(response).toBeTruthy();

  // it('should generate a pdf', async () => {
  //   const res = await request(app).post('/api/pdf').send({ resume: 'test' });
  //   expect(res).toBeTruthy();
  // });
  //   // Add more assertions based on the expected response structure
  // });
  // test('POST /api/pdf without file', async () => {
  //   const response = await request(app).post('/api/pdf');
  //   expect(response.statusCode).toBe(400);
  //   expect(response.text).toBe('No file attached');
  // });
  // test('POST /api/updatedResume', async () => {
  //   const requestBody = {
  //     originalResume: 'Sample original resume',
  //     jobDescription: 'Sample job description',
  //   };
  //   const response = await request(app)
  //     .post('/api/updatedResume')
  //     .send(requestBody);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('property_name');
  //   // Add more assertions based on the expected response structure
  // });
  // test('POST /api/updatedPdf', async () => {
  //   const response = await request(app)
  //     .post('/api/updatedPdf')
  //     .attach('resume', 'path/to/sample/resume.pdf')
  //     .attach('jobDescription', 'path/to/sample/jobDescription.txt');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('property_name');
  //   // Add more assertions based on the expected response structure
  // });
  // test('POST /api/coverLetter', async () => {
  //   const requestBody = {
  //     originalResume: 'Sample original resume',
  //     jobDescription: 'Sample job description',
  //   };
  //   const response = await request(app)
  //     .post('/api/coverLetter')
  //     .send(requestBody);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('property_name');
  //   // Add more assertions based on the expected response structure
  // });
  // test('POST /api/test', async () => {
  //   const requestBody = {
  //     // Add properties based on the expected request body structure
  //   };
  //   const response = await request(app)
  //     .post('/api/test')
  //     .send(requestBody);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('property_name');
  //   // Add more assertions based on the expected response structure
  // });


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
  const { createChatCompletionMock } = jest.requireMock('openai');
  
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

jest.mock('axios');
describe('getResume function', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });
  it('should call the OpenAI API with the correct parameters', async () => {
    const actual_resume = 'My current resume';
    axios.post.mockResolvedValue({
      data: {
        choices: [
          {
            text: 'EDITED RESUME',
          },
        ],
      },
    });
    await getResume(actual_resume);
    const prompt = fs.readFileSync('prompt.txt', 'utf-8');
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        max_tokens: 1938,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
  });
});