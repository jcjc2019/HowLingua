# HowLingua: A learner-centered language-learning app.

## Overview

This app is designed to help learners to study [Less Commonly Taught Languages (or LCTLs)](https://en.wikipedia.org/wiki/Less_Commonly_Taught_Languages). The learning unit is primarily organized by topic. A learner can start to learn how to say words in her/his chosen topic and language immediately.

This app is designed based upon my experience of teaching Mandarin language to American college students. The learning curriculum is created by myself. It is designed to cater to a language learner's immediate needs by presenting words and phrases right after a topic is chosen.

Currently only the first topic "greetings" is available for Mandarin and Japanese. Support for more topics and languages will be added in the future.

## Version

- 0.1 (June 15, 2019)

## Current Features

- Users are able to hear how foreign words sound. Made possible through [speech synthesis](https://en.wikipedia.org/wiki/Speech_synthesis) technology.
- Users are able to talk to the computer and learn to improve the pronunciation through practices. Made possible through [speech recognition](https://en.wikipedia.org/wiki/Speech_recognition) technology.
- To maximize learning effect, a user cannot continue to learn next new word until s/he gets the pronunciation of the current word recognized by the computer.
- Users are able to learn a single topic in different languages, without switching to a different interface.
- Unlogged users can learn how to say words and phrases in the first topic unit “greetings” in both Mandarin and Japanese.
- Logged user can securely log in and log off, check learning progress, or start to learn a different foreign language seamlessly.
- Able to switch between light and dark mode.

## Built with

### Front-end

- [React.js](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Material UI](https://material-ui.com)

### Back-end

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

### Text-to-Speech and Speech-to-Text APIs

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Microsoft Speech API](https://azure.microsoft.com/en-us/services/cognitive-services/directory/speech/)

## Contributor

- [Jing Chen](https://github.com/jcjc2019)

## To start the app locally

- Step 1: clone the repo to your local computer.
- Step 2: in your terminal, navigate to back-end folder by entering `cd back-end`, then enter `npm install` to install necessary npm packages, then enter `node server` to start the back-end Express server.
- Step 3: open a new terminal, navigate to front-end folder by entering `cd front-end`, then enter `npm install` to install necessary npm packages, then enter `npm start` to start the front-end React app.
- Step 4: if everything works, then go to `http://localhost:3000/` to use the app.

## Live Demo

Please check out the live version here: (link to be added.)
