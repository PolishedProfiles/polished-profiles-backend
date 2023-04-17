const axios = require ('axios');
const fs = require ('fs');

async function getResume (actual_resume) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY ;
  const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

  const prompt = `You are a resume writing AI . I will provide you with my resume, and you rewrite it in a desire format.

  [MY RESUME]
  
  ${actual_resume}
  

  [DESIRED FORMAT]
{{Full Name}}</br>
{{Professional Title}}</br>
{{Location}} | {{Email}} | {{Phone Number}}</br>
{{LinkedIn Profile URL}} | {{Github Profile URL}}
  
  {{Professional Summary}}
  Full-stack software developer with prior experience in {{Industry Verticals}} verticals. A fast learner with a keen eye for design and a passion for writing clean, efficient code with a solid foundation in both front-end and back-end development.
  
  TECHNICAL SKILLS
  
  Languages: {{Language1}}, {{Language2}}, {{Language3}}, {{Language4}}, {{Language5}}, {{Language6}}
  
  Skills and Tools: {{Skill1}}, {{Skill2}}, {{Skill3}}, {{Skill4}}, {{Skill5}}, {{Skill6}}, {{Skill7}}, {{Skill8}}, {{Skill9}}, {{Skill10}}, {{Skill11}}
  
  PROJECTS
  
  {{Project1 Name}}, {{Project1 Date}} - {{Project1 URL}}</br>
  {{Project1 Description}}</br>
  Built with {{Project1 Tools}}
  
  {{Project2 Name}}, {{Project2 Date}} - {{Project2 URL}}</br>
  {{Project2 Description}}</br>
  Built with {{Project2 Tools}}
  
  {{Project3 Name}}, {{Project3 Date}} - {{Project3 URL}}</br>
  {{Project3 Description}}</br>
  Built with {{Project3 Tools}}
  
  {{Project4 Name}}, {{Project4 Date}} - {{Project4 URL}}</br>
  {{Project4 Description}}</br>
  Built with {{Project4 Tools}}
  
  {{Project5 Name}}, {{Project5 Date}} - {{Project5 URL}}</br>
  {{Project5 Description}}</br>
  Built with {{Project5 Tools}}
  
  EDUCATION
  
  {{Education1 Name}}, {{Education1 Location}}</br>
  {{Education1 Degree}}, {{Education1 Field of Study}} - {{Education1 Date}}
  
  {{Education2 Name}}</br>
  {{Education2 Certificate}} - {{Education2 Date}}
  
  {{Education3 Name}}</br>
  {{Education3 Certificate}} - {{Education3 Date}}
  
  {{Education4 Name}}</br>
  {{Education4 Degree}}, {{Education4 Field of Study}} - {{Education4 Date}}
  
  EXPERIENCE
  
  {{Experience1 Title}} - {{Experience1 Dates}}</br>
  {{Experience1 Description}}
  
  {{Experience2 Title}} - {{Experience2 Dates}}</br>
  {{Experience2 Description}}
  
  {{Experience3 Title}} - {{Experience3 Dates}}</br>
  {{Experience3 Description}}
  
  NOTE: USE MARKDOWN TO FORMAT YOUR RESUME
  YOUR RESPONSE:`;

  // Write the prompt into a file named prompt.txt
  fs.writeFileSync ('prompt.txt', prompt);


  const response = await axios.post (
    OPENAI_API_URL,
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
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );
  //console.log (response.data.choices[0].text);
  return response.data.choices[0].text;
}

module.exports = {getResume};
