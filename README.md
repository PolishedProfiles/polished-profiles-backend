# Polished Profiles

Polished Profiles is a ReactJS web application that leverages chatGPT to improve professional summaries and bullet points on a resume to best suit a given job description.

## Installation

To use our application, you can either visit the deployed site `https://polished-profiles.netlify.app/` or follow these steps:

1. Clone the Repositories:

`git clone https://github.com/PolishedProfiles/polished-profiles-frontend.git`

`git clone https://github.com/PolishedProfiles/polished-profiles-backend.git`

2. Navigate to the appropriate directory:

`cd polished-profiles`

3. Install dependencies:

`npm install`

4. Edit the `.env.sample` and remove the `.sample`

5. Start the development server:

`npm start` for the Front End
`node server.js` for the Back End

## Usage

1. Navigate to http://localhost:3000 in your web browser.
2. Log in using Auth0.
3. Either upload a PDF of your current resume, or copy/ paste your resume into Resume Info Box, along with the Job Description for the role you're applying for.
4. Review the suggested changes and make any necessary adjustments.
5. Click the Download button to download a PDF of your resume

## Features

* Integration with the ChatGPT API to suggest improvements to professional summaries and bullet points based on a given job description.
* An intuitive web interface for entering and editing resume text.
* The ability to download the tailored resume as a PDF.
* Check the History Tab to display a list of any previously created Resumes

## Technologies Used

Professional Profiles was built using the following technologies:

* ReactJS
* OpenAI API
* HTML
* CSS
* JavaScript
* PostGRES
* Axios
* Jest
* Material UI
* Mantine
* SQL
* HTML2PDF

## Credits

Professional Profiles was created by Tyler Bennett, Ashwini Uppal, Brenda Jow, Rafael Aldana Sandoval, and John Chavez.

## License

Professional Profiles is licensed under the MIT License.
