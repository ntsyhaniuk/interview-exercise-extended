# Front-End Challenge Solver


[](https://github.com/nazartsyhanyuk/interview-exercise-extended/assets/15053531/ceab4be7-4823-49ff-a04f-0c5e6bf98f85)


## You can test it here: [https://nazartsyhanyuk.github.io/interview-exercise-extended/](https://nazartsyhanyuk.github.io/interview-exercise-extended/)

## Overview

This React application was developed to simplify the passing of a technical exercise for a front-end position at some company. It automates the task of decoding a base64 string to reveal a link, parsing a complex DOM structure to retrieve specific elements, building a link, capturing a flag, and then displaying it character by character every second.
I was too lazy to do it manually, so I wrote an application that does it automatically and looks nice.

## How It Works

- **Base64 Validation:** Automatically verifies if a given string is a base64 string.
- **Base64 Decoding:** Decodes a given base64 string to reveal a hidden URL.
- **URL Validation:** Checks if a given string is a valid URL.
- **Instructions Parsing:** Navigate to the provided link to parse the instructions template, get a link to the challenge template, and build a selector.
- **DOM Parsing:** Navigate to the provided link to parse a complex DOM structure, retrieving elements based on a generated selector.
- **Value Retrieval and Assembly:** Joins the retrieved values to form a second link.
- **Dynamic Fetch:** Fetches a specific flag (a two-word phrase) from the second link.
- **Display a Flag:** Display a flag with fancy animation on the page.

- **Publishing:** Publishes the template of the app with the required functionality to the code sandbox.
- **Display link to the sandbox:** Builds and displays on the page a clickable link to the generated sandbox with a ready-to-run application that meets the requirements of the task.

## Installation and Usage

To use this application:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install` or `yarn`.
3. Start the application by running `npm start` or `yarn start`.
4. Input the base64 encoded string when prompted.
5. The application will automatically process the input and display the results.

## Technologies Used

- `React.js`
- `codesandbox` tools and API
- `dompurify` for sanitizing templates
- `lodash/debounce` because I'm too lazy
