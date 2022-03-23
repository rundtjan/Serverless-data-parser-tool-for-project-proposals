# Serverless API for AWS Lambda

In order to deploy, first install (production) dependencies:
```bash
npm install --production
```
And then zip all that is needed by AWS, e.g.:
```bash
zip -r lambda.zip index.js routes application controllers services utils node_modules 
```
Then login to AWS and upload the zip-file to the Lambda-function you are using.