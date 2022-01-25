# Serverless data parser tool for project proposals

![CI workflow](https://github.com/Ohtu-org/Serverless-data-parser-tool-for-project-proposals/actions/workflows/main.yml/badge.svg)

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
docker run -it -p [your port]:8080 [name] (use 8080 as your port unless you want to change this in the frontend code)
```
Or run with npm (the server will start on port 8080):
```bash
npm install  
npm run build  
npm start  
```
