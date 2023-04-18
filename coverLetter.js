
const { Configuration, OpenAIApi } = require('openai');


//console.log(configuration.apiKey);



async function coverLetter(actual_resume, job_description) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,


  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
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



  // console.log (completion.data.choices[0].message);
  return completion.data.choices[0].message.content;
}

module.exports = { coverLetter };

