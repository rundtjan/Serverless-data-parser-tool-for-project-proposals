# Parsa user and installation guide  

## What is Parsa  
Serverless data parser tool aka Parsa is an application used for parsing Slack conversations from a single workspace.

### What is needed to use Parsa:  
- A Slack workspace and Slack Bot User OAuth token
- An HubSpot API key
- FOR SERVELRESS VERSION you need also an AWS account
- FOR NON-SERVERLESS aka LEGACY-BACKEND version you do not need anything extra

### Getting started with Parsa:  

#### Using Parsa with your Slack workspace:  
As our Parsa app has not been yet made as an shareable app you need to configure it yourself. If you are building your workspace from scratch [here](https://slack.com/help/articles/115005265703-Create-a-bot-for-your-workspace) is link to Slack's own documentation.

We have the following Bot Token Scopes: 


| channels:history   | View messages and other content in public channels that export-test has been added to  |
|--------------------|----------------------------------------------------------------------------------------|
| channels:read      | View basic information about public channels in a workspace                            |
| chat:write         | Send messages as @parsabot                                                             |
| commands           | Add shortcuts and/or slash commands that people can use                                |
| groups:history     | View messages and other content in private channels that export-test has been added to |
| groups:read        | View basic information about private channels that export-test has been added to       |
| im:read            | View basic information about direct messages that export-test has been added to        |
| mpim:read          | View basic information about group direct messages that export-test has been added to  |
| users.profile:read | View profile details about people in a workspace                                       |
| users:read         | View people in a workspace                                                             |  

You can create a slash command from "Features"->"Slash Commands" view by clicking the "Create New Command". We have the following configuration in Slash Commands view:  

| Command                                            | /parse                                                                                      |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|
| Request URL                                        | Production Backend url. In our serverless version this was a link to backend prodution api. |
| Short Description                                  | Write what you want                                                                         |
| Usage Hint                                         | [user, hours, channel] - or "help" for manual.                                              |
| Escape channels, users, and links sent to your app | Not selected                                                                                |

These can be changed as the user wants from the panel.

You can create a message shortcut from "Features"->"Interactivity & Shortcuts" view by clicking the "Create New Shortcut". Our Message shortcut had the following configuration:  

| Name          | Location | Callback ID     |
|---------------|----------|-----------------|
| Parse threads | Messages | thread_shortcut |

| Interactivity | On                     |
|---------------|------------------------|
| Request URL   | PRoduction Backend URL |

Bot User OAuth Token can be found from the app dashboard "OAuth & Permissions" -> OAuth Tokens for Your Workspace.  