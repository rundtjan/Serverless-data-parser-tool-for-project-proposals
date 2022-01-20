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
5. Browse to the landing-page (note that you can change port by adding env-variable PORT):
```bash
localhost:8080   
```
6. To access the data-api browse to: 
```bash
localhost:8080/api/data/{enter a valid Slack-channel-id here}
```
7. You can also build a Dockerfile with:
```bash
docker build -t {enter a name that suits your Docker-image here} .  
```
8. And run it with:
```bash
docker run -p {enter a port you wish to use here}:8080 -it {enter the name you gave the image}  
```

