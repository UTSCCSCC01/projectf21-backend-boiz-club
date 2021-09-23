# Pawsup

## Motivation
Pawsup is a platform that serves as a middleman between private pet caretakers and pet owners. Pet caretakers can provide services such as pet walking, pet boarding, and pet sitting.  

Unlike large corporations like PetSmart who offer services in a one to many fashion where they will take care of many other pets at the same time, PAWSUP focuses on a one to one service between the caretaker and the pet so pet owners can be assured that their precious pet is getting the undivided attention it needs.  

This project is for the mobile application of PAWSUP.

## Installation
### Frontend
List of tools/dependencies used:
- React Native
- [Expo](https://docs.expo.dev/get-started/installation/) (Installation Instructions)

To start the development server (After following the Expo installation instructions):
```bash
cd frontend # change directory to frontend
expo start # OR: npm start
```
### Backend
List of tools/dependencies used:
- node.js
- express.js
- [Docker](https://docs.docker.com/get-docker/) (Installation Instructions)

To start the backend server (After installing Docker):
```bash
cd backend # change directory to backend
docker build -t pawsup . # build dockerfile and tag it "pawsup"
docker container run --name pawsup-container -p <port>:8080 pawsup # run container and expose the <port> port externally
```

## Contribution
This repository consists of three core branches:
#### 1. `main`
This branch consists of only fully developed and tested features. After a feature is fully tested in the `test` branch, only then it can be merged into `main`. Additionally, commits should be squashed before merging into `main`.

#### 2. `test` (Created from `main`)
This branch is used for integration testing. After an isolated feature is tested in `dev`, it can be merged into `test`

#### 3. `dev` (Created from `test`)
This branch is used for feature development. After a feature is developed, a pull request must be made to merge into `dev`. The pull request must be reviewed and approved by a minimum of 2 other developers.

### Feature Development
To develop a feature, a feature branch is created off of `dev` with the naming prefix `feat/`.  
E.g.: `feat/account-signup`

When developing a feature, commits should be made often and encapsulate smallest possible units of change to the code base. Commits messages must adhere to the [conventional commit standard](https://www.conventionalcommits.org/en/v1.0.0/).
