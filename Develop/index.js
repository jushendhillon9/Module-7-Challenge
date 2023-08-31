// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");



// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "motivationOne",
        message: "What was your motivation?",
    },
    {
        type: "input",
        name: "motivationTwo",
        message: "Why did you build this project",
    },
    {
        type: "input",
        name: "motivationThree",
        message: "What problem does it solve?",
    },
    {
        type: "input",
        name: "motivationFour",
        message: "What did you learn", 
    },
    {
        type: "input",
        name: "installation",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.", 
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide instructions and examples for the usage of your project."
    }, 
    {
        type: "list",
        message: "Which of the following licenses does your project require?",
        name: "License",
        choices: ["Apache 2.0", "MIT", "GPL 3.0"],
    }, 
    {
        type: "input",
        name: "Contributing",
        message: "If you created an application or package and would like other developers to contribute it, please include guidelines for how to do so.",
    },
    {
        type: "input",
        name: "collaboratorsOne",
        message: "List your collaborators, if any, with links to their GitHub profiles."
    }, 
    {
        type: "input",
        name: "collaboratorsTwo",
        message: "If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section."
    }, 
    {
        type: "input",
        name: "collaboratorsThree",
        message: "If you followed tutorials, please include those links with spaces between consecutive links."
    },
    {
        type: "input",
        name: "Tests",
        message: "Please provide the instructions to run the tests you wrote for your project",
    },
    {
        type: "input",
        name: "questions",
        message: "Please provide your github username",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?",
    }
     /*,
    "Optional: if you project has a lot of features, list them here. Otherwise hit the enter key.",
    "Optional: if you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so here.",*/
];

//use the inquirer prompt funciton to prompt the user with questions, which it will capture the answers under "answers"
//use .then() to log the answers

// TODO: Create a function to write README file
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("ReadME file successfully written!");
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    let data;
    let fileName;
    let badge = "";


    //INQUIRER PROMPT IS AN ASYNCHRONOUS FUNCTION
    inquirer.prompt(questions).then((answers) => {
        data = `## ${answers.title}  insert markdown

        ## Description
        
        ${answers.motivationOne} ${answers.motivationTwo} ${answers.motivationThree} ${answers.motivationFour} 

        ## Table of Contents
        - [Installation](#installation)
        - [Usage](#usage)
        - [License](#license)
        - [Contributing](#contributing)
        - [Credits](#credits)
        - [Tests](#tests)
       
        
        ## Installation

        ${answers.installation}

        ## Usage

        ${answers.usage}

        ## License

        ${answers.License}

        ## Contributing

        ${answers.Contributing}

        ## Tests

        ${answers.Tests};

        ## Credits

        Collaborators: ${answers.collaboratorsOne}<br>
        Third-party assets: ${answers.collaboratorsTwo}<br>
        Tutorials: ${answers.collaboratorsThree} 

        ## Question

        Link to Github: https://github.com/${answers.questions}<br>
        <br>
        If you have any further questions, please reach out to me via email @${answers.email}

        
        `.replace(/^\s+/gm, ""); 
        fileName = answers.title;

        if (answers.License === 'MIT') {
            badge = 'https://img.shields.io/badge/License-MIT-yellow.svg';
        } else if (answers.License === 'Apache 2.0') {
            badge = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg';
        } else if (answers.License === 'GPL 3.0') {
            badge = 'https://img.shields.io/badge/License-GPLv3-blue.svg';
        } else {
            badge = '';
        }
        const markdown = `![BadgeLicense](${badge})`.replace(/^\s+/gm, "");
        data = data.replace("insert markdown", markdown); 
        writeFile(fileName, data); //need to put writeFile() in the .then() inquirer prompt is asynchronous... if writeFile() was outside of .then()
        //it would be ran before inquirer prompt finishes running (when the user finishes inputting their answers)
    })
}

// Function call to initialize app, this stays outside of the init() function otherwise nothing will run...
init();