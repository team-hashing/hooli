# hooli - An eco-friendly mobile app

![Hooli Logo](./assets/hooli.png)
![GitHub package.json version](https://img.shields.io/github/package-json/v/team-hashing/hooli)
![GitHub All Releases](https://img.shields.io/github/downloads/team-hashing/hooli/total)
![GitHub last commit](https://img.shields.io/github/last-commit/team-hashing/hooli)
![GitHub issues](https://img.shields.io/github/issues-raw/team-hashing/hooli)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/team-hashing/hooli)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/team-hashing/hooli)
![GitHub contributors](https://img.shields.io/github/contributors/team-hashing/hooli)
![GitHub language count](https://img.shields.io/github/languages/count/team-hashing/hooli)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/team-hashing/hooli)
![GitHub repo size](https://img.shields.io/github/repo-size/team-hashing/hooli)
![GitHub top language](https://img.shields.io/github/languages/top/team-hashing/hooli)

![GitHub Repo stars](https://img.shields.io/github/stars/team-hashing/hooli?style=social)
![GitHub forks](https://img.shields.io/github/forks/team-hashing/hooli?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/team-hashing/hooli?style=social)

Hooli is a mobile application designed to promote eco-friendly habits among its users. It is built using React Native and Expo, two powerful tools that allow for the development of native mobile applications using JavaScript and React.

The application is structured to separate the UI components from the business logic. This separation of concerns makes the codebase easier to maintain and extend, as changes to the UI do not affect the underlying business logic and vice versa.

Video of the project [here](https://www.youtube.com/watch?v=4azPGzbJKRg)

## new update: web demo
We added a new web demo to try part of the app from web.This was made in react and only shows a small part of what the mobile app is capable of. Demo is on Github Pages, link [here](https://team-hashing.github.io/hooli/).

## Features

### Daily Activity Logging

Hooli allows users to log their daily activities. The application uses the Gemini system to analyze these activities and determine their environmental impact. This feature encourages users to be more mindful of their daily habits and their effect on the environment.

### Eco-Friendly Challenges

To further encourage eco-friendly behavior, Hooli introduces challenges that users can undertake. These challenges range from simple tasks like recycling or reducing water usage, to more complex activities like adopting a plant-based diet or reducing carbon footprint.

### Rewards System

To motivate users to participate in these challenges, Hooli implements a rewards system. Users earn points for being green and completing challenges, and these points can be exchanged for rewards. The rewards serve as an incentive for users to adopt more eco-friendly habits.

### Eco-Friendly Education

In addition to the activity logging and challenges, Hooli also provides feedback for educational purposes about your eco-friendly practices. This content helps users understand why certain habits are harmful to the environment and how they can change their behavior to reduce their environmental impact.

By combining these features, Hooli aims to make living an eco-friendly lifestyle more accessible and enjoyable. It provides the tools and motivation for users to make positive changes in their daily habits and contribute to a healthier planet.


## Project Structure

This project is a monorepo containing both the client and server side code. 

### Client

The client is a mobile application built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). React Native allows us to write native mobile applications in JavaScript and React, while Expo provides a set of tools and services for building, deploying, and quickly iterating on iOS, Android, and web apps.

### Server

The server-side code is located in the server directory. It is a Node.js application that handles requests from the client, interacts with the Firebase database, and provides responses. Node.js is a JavaScript runtime that allows us to run JavaScript on the server.

### Firebase

We use [Firebase](https://firebase.google.com/) for user authentication and as our NoSQL database. Firebase provides a suite of cloud-based services that includes a NoSQL database, user authentication, real-time updates, and more. The Firebase configuration can be found in `firebaseConfig.js` and the admin requirements in `firebase_admin.json` (To run project backend, this file must be created)

### Package Management

Both the client and server use the same package management system, npm, which is not optimal but makes it easier to work with when using a single repository. 

Please note that while this structure has its benefits, such as code sharing and ease of setup, it also has its drawbacks, such as potential for package version conflicts between the client and server. It's important to carefully manage your dependencies in this setup.

## How to use

This project is a monorepo containing both the client and server side code. Here are the steps to set up and run the project:

## Firebase Setup

1. Create a new project on [Firebase](https://firebase.google.com/).
2. Navigate to the Firebase project settings and under the 'General' tab, you'll find your project's unique Firebase SDK snippet. This contains the configuration for your Firebase project.
3. Replace the existing configuration in `firebaseConfig.js` with your project's Firebase SDK snippet.
4. Generate a new private key file for your service account. In your Firebase project settings, navigate to 'Service accounts', then click 'Generate new private key'. This will download a `.json` file containing your service account credentials.
5. Replace the existing file at `firebase_admin.json`with the file you just downloaded.
6. In your Firebase project, create two collections: "users" and "experiences".

## Google Cloud and Gemini Setup
1. Create a new project on Google Cloud.
2. Enable the Gemini API for your Google Cloud project.
3. Generate a new API key for your project.
4. Replace the existing API key in `server/gemini-api.js` with your new API key.
5. Make sure to correctly configure your Google Cloud project to identify your user. This usually involves setting up OAuth 2.0 and specifying the authorized JavaScript origins and redirect URIs.


## Server Setup

1. Navigate to the root directory.
2. Run `npm install` to install the necessary dependencies.
3. Run the server with `node server/server.js`.

## Client Setup

1. Navigate to the root directory.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root of the client directory with the following fields:
    - `FIREBASE_API_KEY`: Your Firebase API key.
    - `HOST`: The host of your server.
4. Run the client with `npx expo start` (without voice usage due to Expo limitations) or compile the React Native project.

Please note that you may need to adjust some configurations in the code to suit your specific setup. Be sure to carefully manage your dependencies in this setup to avoid conflicts.

# Contributors

- [Daniel Varela Sánchez](https://github.com/danivs10)
- [Guillermo Martín-Coello Juárez](https://github.com/Gmarcoel)

- [Project Repository](https://github.com/team-hashing/hooli)
- [Video of the project](https://www.youtube.com/watch?v=4azPGzbJKRg)