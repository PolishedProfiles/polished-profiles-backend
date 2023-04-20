const { updatedResume } = require('./updatedResume');
jest.mock('openai', () => {
  const createChatCompletionMock = jest.fn().mockResolvedValue({
    data: {
      choices: [
        {
          message: {
            content: 'EDITED RESUME',
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

describe('updatedResume function', () => {
  it('should call OpenAIApi createChatCompletion with the correct parameters', async () => {
    const actual_resume = 'My current resume';
    const job_description = 'Job description for a new position';
    await updatedResume(actual_resume, job_description);
    expect(createChatCompletionMock).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a resume editor AI.  I will provide with my resume and a job description. You will edit the resume according to job description. Do not add new skills which are not added by the candidate.Return the resume with edited professional summary as first person.',
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