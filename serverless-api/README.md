# Serverless API for Azure Functions  

This is a serverless API that responds to slash commands from Slack at the endpoint /api/slashParse and which returns the result from api/parseResult.  
Needs Node 14.xx in order to function, newer versions of Node will throw an error.  
You will need to add a local.settings.json, not included because it is somewhat similar to an .env-file. It should contain:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SLACK_TOKEN": [put your Slack-token here]
  },
  "Host": {
    "LocalHttpPort": 7073
  }
}
```
In order to run locally you will need the the npm-package Azure Functions Core Tools:
```bash
npm i -g azure-functions-core-tools@3 --unsafe-perm true
```
