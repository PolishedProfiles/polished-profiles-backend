
const {Configuration, OpenAIApi} = require ('openai');
const configuration = new Configuration ({
  apiKey: process.env.OPENAI_API_KEY,

});

console.log(configuration.apiKey);

const openai = new OpenAIApi (configuration);

async function updatedResume (actual_resume, job_description) {
  const completion = await openai.createChatCompletion ({
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



  // console.log (completion.data.choices[0].message);
  return completion.data.choices[0].message.content;
}

module.exports = {updatedResume};