# Parsa aka Serverless data parser tool for project proposals

![CI workflow](https://github.com/Ohtu-org/Serverless-data-parser-tool-for-project-proposals/actions/workflows/main.yml/badge.svg)
![codecov](https://codecov.io/gh/Ohtu-org/Serverless-data-parser-tool-for-project-proposals/branch/main/graph/badge.svg?token=S2MQ8HYQ94)

## Tuntikirjanpito  
[Linkki tuntikirjanpitoon](https://docs.google.com/spreadsheets/d/1cuh5_3st2fF5PlzxUwkLurNdqGqkFm90v7kIZbUjTgg/edit#gid=2125689465)

## Product Backlog
[View the product backlog here](https://github.com/orgs/Ohtu-org/projects/1/views/1?layout=board)

## Definition of Done
- The user stories are tested with suitable unittests and end-to-end-tests
- The tests are successful (in the green) 
- The user stories match the requirement specifications
- The code is reviewed
- The code is of good quality (e.g. approved by lint)
- The product owner has accepted the user story as done

## Usage
Clone the repository. In order to use the application with the serverless api, you will need the suitable AWS applications, e.g. a Lambda-function where you can upload the code from the folder "/api". See the readme in that folder for more information.

Note that the Lambda-function you are using will need to have two environment variables set: 
```bash
SLACK_TOKEN and HUBSPOT_APIKEY
```

The frontend is a React-application, and can be started locally. Change directory into the folder "front", run:
```bash
npm install
```
And run with the command:
```bash
REACT_APP_API_URL='[enter the url of your Lambda-function here]' npm start
```
Dockerfile and possibility to run the serverless api locally in a container is coming up, stay tuned.
