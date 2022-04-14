# Parsa installation and configuration guide

## What is Parsa  
Serverless data parser tool aka Parsa is an application used for parsing Slack conversations from a single workspace. This conversation data can then be filtered and organized by categories. After organizing the data can then be sent to HubSpot CRM. Through Parsa you can also fetch and update existing deals from HubSpot environment.

### What is needed to use Parsa from a Slack workspace:
- A Slack workspace
- A Slack app
- Slack Bot User OAuth token
- FOR SERVERLESS VERSION aka the MVP aka the Main-branch implementation you need also an AWS account (tbd more precisely how to use and cofigure at some point)

If you want to send data to HubSpot CRM you will also need:
- An HubSpot environment and/or account
- An HubSpot API key for the environment

### Using Parsa with your Slack workspace:
As our Parsa app has not been yet made as an shareable app you need to configure it yourself. If you are starting to use Parsa from scratch you will need a Slack workspace and a bot user for your workspace. Look [here](https://slack.com/help/articles/115005265703-Create-a-bot-for-your-workspace) for detailed instructions (link to Slack's own documentation).

Bot User OAuth Token can be found from the app dashboard "OAuth & Permissions" &rarr; "OAuth Tokens for Your Workspace". This is needed to the .env file.

#### Slack bot instructions
The created app/bot must be invited to the channel where you want to parse the messages. If the bot is not in the channel you can not access to view the parsed messages in the Parsa UI. You can invite the bot to the channel with "@[your-bot-name-here]" and remove with "@remove [your-bot-name-here]" or "@kick [your-bot-name-here]".  

#### Configuring your .env file
Your .env file should look like this to work:
    SLACK_TOKEN=[YOUR-BOT-USER-OAUTH-TOKEN-HERE]
    HUBSPOT_APIKEY=[YOUR-HUBSPOT-API-KEY-HERE]

#### Bot Token Scopes:
When you have created your bot and can access to the Slack app control panel here is a list of configurations which we had during our project:  

| OAuth Scope        | Description                                                                            |
|--------------------|----------------------------------------------------------------------------------------|
| channels:history   | View messages and other content in public channels that export-test has been added to  |
| channels:read      | View basic information about public channels in a workspace                            |
| chat:write         | Send messages as @parsabot                                                             |
| commands           | Add shortcuts and/or slash commands that people can use                                |
| groups:history     | View messages and other content in private channels that export-test has been added to |
| groups:read        | View basic information about private channels that export-test has been added to       |
| im:read            | View basic information about direct messages that export-test has been added to        |
| mpim:read          | View basic information about group direct messages that export-test has been added to  |
| users.profile:read | View profile details about people in a workspace                                       |
| users:read         | View people in a workspace                                                             |  

#### Slash commands
When using Parsa from Slack, the "/parse" is called a Slash command in Slack term. In Slack app control panel you can create a Slash command to your workspace from "Features" &rarr; "Slash Commands" view and clicking the "Create New Command". Read more from Slash commands [here](https://api.slack.com/interactivity/slash-commands).  

We have the following configuration in Slash Commands view:  
|                                                    |                                                                                             |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|
| Command                                            | Parse                                                                                       |
| Request URL                                        | Production Backend url. In our serverless version this was a link to backend prodution api. |
| Short Description                                  | Write what you want                                                                         |
| Usage Hint                                         | [user, hours] - or "help" for manual.                                                       |
| Escape channels, users, and links sent to your app | Not selected                                                                                |

These can be changed according to your choice and needs.

#### Message shortcut
With Parsa you can also parse and send just threads to the Parsa UI. This is implemented with Slack Message shortcuts. You can create a message shortcut from "Features" &rarr; "Interactivity & Shortcuts" view by clicking the "Create New Shortcut". You can read more about Slack's Message Shortcuts from [here](https://api.slack.com/interactivity/shortcuts/using). Our Message shortcut had the following configuration:  

| Name          | Location | Callback ID     |
|---------------|----------|-----------------|
| Parse threads | Messages | thread_shortcut |

|               |                        |
|---------------|------------------------|
| Interactivity | On                     |
| Request URL   | Production Backend URL |
