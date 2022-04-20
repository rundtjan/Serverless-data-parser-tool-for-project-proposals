# AWS tips and cheat sheet

## Preface
No one from our development team had never used AWS in a bigger project. So here are some tricks and tips which we tought we ourselves would have needed when we transferred our software from monolithic Node.js backend to serverless architecture and AWS Lambdas.  

## How to configure an AWS account to the project
You will need an AWS Lambda-function, so after logging in to or creating an account at AWS, head off to the Lambda-department and:
- choose a suitable region in the dropdown menu in the upper righthand corner (suitable means that it's geographically close to your users)
- click "Create function"
- choose "Author from scratch"
- give the function a nice name
- choose Node.js as runtime (v. 14.x was used while developing this project)
- click "Create function"

Then you will need to add an url to your Lambda-function. To do this, you can *either* use an API Gateway: 
- click "Add trigger"
- select "API Gateway"
- select "Create an API"
- choose "HTTP API"
- choose "Open" in the Security dropdown menu
- you might want to click "Additional settings" and choose "Cross-origin resource sharing"
- click "Add"

*Or* you can use a new feature, which wasn't available when this application was developed, so it has not been tested by the dev-team:
- on the tab "Configuration" click "Function URL"
- click "Create function URL"
- choose Auth type "NONE"
- click "Configure cross-origin resource share (CORS)"
- you might e.g. allow methods GET and POST
- click "Save"

And Bob's your uncle. If you added an API-trigger, you can click on "API Gateway" to see the full url for your Lambda, and also to configure the Gateway (CORS-settings and so forth).

## Using the AWS Lambda-console

- On the tab "Code" you can click "Upload from" in order to upload your function to AWS. You will need to zip it, see the readme in the API-folder. 
- On the tab "Monitor" you can find the link for viewing logs from your function - click "View logs in CloudWatch" to open the logs. 
- On the tab "Configuration" you *need to* add environment variables. You will need a SLACK_TOKEN and a HUBSPOT_APIKEY in order for everything to work nicely.  

These are the tabs the dev-team of this application has used, feel free to explore the other tabs by yourself.

## AWS Toolkit
AWS Toolkit is an extension for VSCode which might come in handy. More information from AWS website [here](https://aws.amazon.com/visualstudiocode/).  

## Local running and testing of lambdas
AWS offer tools for running and testing lambdas locally, you might want to read [this](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-debugging.html).  
Note that Parsa is just a big, ordinary Node-function, so you can execute it on your own machine like any other Node-function. There's actually a helper file for this purpose in the folder api/utils. The file "run_locally.js" executes Parsa with any event.body payload that you would like to test (you will need to use your own, since those that are listed there only suit the data in the slack-environment used by this dev-team). You can copy the payload in raw format from the AWS logs. The function then console logs the response that would have been sent by the Lambda function.
