# CV Analyzer

**CV Analyzer** is a front-end web application designed to help job seekers compare their resumes against target job descriptions. Users can upload or select a saved CV, run an AI-style compatibility check, view skill gaps and actionable recommendations, and build or edit resumes directly inside the browser.


## Project Overview
CV Analyzer provides job seekers with a streamlined, browser-based workspace to evaluate their qualifications against target job postings. The application features user authentication, a centralized dashboard, detailed resume analysis with match scores, and an interactive resume builder/editor.

## Features
* **Authentication Flow:** Secure login and registration screens (`login.html`, `Register.html`) to manage user sessions.
* **Workspace Dashboard (`Dashbord.html`):** A centralized hub providing an immediate overview of saved CVs, analysis history, and quick navigation.
* **Resume & Job Comparison (`Analyze.html`):** Interactive file upload dropzone and dynamic dropdown selection powered by mock data.
* **Dedicated Results View (`Result.html`):** A clean, distraction-free interface displaying compatibility scores, color-coded matching vs. missing skill tags, and approval actions.
* **CV Builder & Editor (`Create.html`):** Dynamic JavaScript controls to add skill tags using `Enter`, duplicate experience/education rows on demand, and open a live preview modal.

## Tools, Libraries & Technologies Used

### Tools
* **Figma:** Used during the initial design phase to plan user flows and layouts.
* **Visual Studio Code:** Primary code editor for development.
* **VS Code Live Server / XAMPP:** Local server environment to handle JSON fetching without browser security blocks.
* **Git & GitHub:** Version control and source code hosting.

### Technologies & Libraries
* **HTML5:** Semantic document structure across all pages.
* **CSS3 (`style.css`):** Custom styling using variables, Flexbox, and Grid without external frameworks.
* **Vanilla JavaScript (`app.js`):** Dynamic DOM manipulation, state handling, form validation, and interactivity.
* **JSON (`Analysis.json`):** Structured mock database simulating backend data.
## Project Structure

```text
CV-Analyzer/
├── Home.html
├── login.html
├── Register.html
├── Dashbord.html
├── Analyze.html
├── Result.html
├── Create.html
├── style.css
├── app.js
└── Analysis.json
