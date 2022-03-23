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
Clone the repository and cd in to the root folder. Add a .env-file to the backend folder with the environment variable:
```bash
SLACK_TOKEN=[enter a slack token here to a bot with the scopes channels:history and users:read]
```
Run using Docker with:
```bash
docker build -t [name] .  
docker run -it -p [your port]:8080 [name] (use 8080 as your port unless you want to change the backend port within the frontend code)
```
Or run with npm (as default the server will start on port 80):
```bash
npm install  
npm run build  
npm start  
```  
When starting frontend and backend separately from their respective folder (e.g. while developing), you can use environment variables REACT_APP_BACKEND_PORT and PORT to 
choose on which port the backend serves data (both variables should be used at the same time).
