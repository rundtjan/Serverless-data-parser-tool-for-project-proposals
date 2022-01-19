# Serverless data parser tool for project proposals

## Definition of Done
- The user stories are tested with suitable unittests and end-to-end-tests
- The tests are successful (in the green) 
- The user stories match the requirement specifications
- The code is reviewed
- The code is of good quality (e.g. approved by lint)

## Usage  
1. Clone the repository and cd into the root directory.  
2. Install dependencies with:
```bash
npm install
```
3. Create a .env file with at least the following entry:
```bash
SLACK_TOKEN={enter a valid token here}
```
4. Run server with:  
```bash
npm start
```
5. Browse to:
```bash
localhost:8080 (default, you can switch port with environment variable PORT) for the landing page.  
```
6. To access the data-api browse to: 
```bash
localhost:8080/api/data/{enter a valid Slack-channel-id here}
```

