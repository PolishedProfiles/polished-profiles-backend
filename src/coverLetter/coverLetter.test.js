const { coverLetter } = require('./coverLetter');

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