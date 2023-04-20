const { getResume } = require('./resumeGenerator');
const axios = require('axios');
const fs = require('fs');
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