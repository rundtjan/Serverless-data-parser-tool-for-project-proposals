# Serverless api for AWS Lambda

A version of the serverless api, available via the url:  
```
https://ksh77k9z1m.execute-api.eu-west-1.amazonaws.com/default/urlFunction
```
Parses Slack slash commands at:  
```
https://ksh77k9z1m.execute-api.eu-west-1.amazonaws.com/default/urlFunction?route=slashCommand
```
Serves data by parameters from:  
```
https://ksh77k9z1m.execute-api.eu-west-1.amazonaws.com/default/urlFunction?route=parseResult
```
Serves channels from:
```
https://ksh77k9z1m.execute-api.eu-west-1.amazonaws.com/default/urlFunction?route=getChannels
```