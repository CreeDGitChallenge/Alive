# Alive – Cross-platform mobile game (React Native)

## Project context
This project was developed as a **collaborative mobile game** with a teammate over three weeks, initially planned as a one-week challenge.  
The game, *Alive*, is a React Native application created with Expo, built for both Android and iOS devices. It lets the player control a cyclist trying to survive the streets of Paris.

This project was an opportunity to combine **React Native skills, gameplay logic, and mobile UI design** in a real, playable application.

## Technical objectives
- Build a cross-platform mobile application using React Native
- Use Expo tooling and ecosystem
- Design UI/UX for touch devices
- Implement game logic and interactions
- Handle animations and user input
- Structure a real-world app project with navigation and scenes
- Collaborate effectively using Git/GitHub

## Technologies used
- **React Native** (via Expo)  
- **Expo CLI & tooling**
- JavaScript / TypeScipt / TSX
- Gesture handling
- Touch interactions & animations
- Navigation logic
- Git / GitHub

## Features
- Gameplay where the player controls a cyclist navigating obstacles
- Cross-platform support (Android and iOS)
- Touch controls for movement and interaction
- Responsive layout for various mobile screen sizes
- In-game feedback and animations

## Demo / Run
You can run the game locally using Expo. The project is intended to be opened in:
- **Expo Go** (mobile)
- Android emulator / iOS simulator  
The game is not currently published to a store but is playable via development builds.

## Installation and setup

### Prerequisites
- Node.js and npm (or yarn)
- Expo CLI installed globally

### Setup steps
1. Clone the repository:
```bash
git clone https://github.com/CreeDGitChallenge/Alive.git
```
2. Navigate into the project and install dependencies:
```bash
cd Alive
npm install
```
3. Start the development server
```bash
npm start
```
4.In the Expo interface, choose how to run the app:  
- Android emulator
- iOS simulator
- Expo Go on physical device

## Project structure
.  
├── app/  
├── assets/  
├── src/  
│   ├── entities/  
│   ├── maps/  
│   ├── scenes/  
│   └── ui/  
├── .vscode/  
├── tests/  
├── types/  
├── app.json  
├── package.json  
├── tsconfig.json  
└── README.md  

- app/ – core configuration & entry  
- src/ – source code (game logic, UI, scenes)  
- assets/ – images and media  
- entities/ – game entities (player, obstacles)  
- scenes/ – different screens or levels  
- ui/ – UI components  

## Areas for improvement
- Add sound effects and music
- Polish animations and game feedback
- Add menu, pause, and score tracking
- Add high-score persistence (local or online)
- Prepare for app store deployment

## Author
Project created by Matthieu Clio, Full-Stack web developer, and Pierre CLIO, React web developer
