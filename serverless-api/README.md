#Serverless API for Azure Functions  

This is a serverless API that responds to slash commands from Slack at the endpoint /api/slashParse and which returns the result from api/parseResult.  
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