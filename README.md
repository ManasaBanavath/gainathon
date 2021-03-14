<div align="center">
    
# Gainsight PX SlackBot

A Slackbot that displays Gainsight PX Account and User information using the account name and User Email

<a href="https://slack.com/oauth/authorize?client_id=407013445267.723094934560&scope=bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>

</div>

# Setup

### Install dependencies

```
npm install

npm start
```

### [Create a bot in Slack](https://api.slack.com/apps/AM92STGGG/general?) and generate and include your OAuth bot token

```
// Add this in your .env
BOT_TOKEN=YOUR_OWN_BOT_TOKEN
PORT=3456
PX_API_KEY=YOUR_PX_ON_PX_REST_TOKEN_HERE

```

```js
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'YOUR_OWN_APP_NAME'
})
```
