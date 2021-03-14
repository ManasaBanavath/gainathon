const SlackBot = require('slackbots');
const axios = require('axios')
const querystring = require('querystring')

require('dotenv').config();

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'PX Pete-GainAthon'
})

// Start Handler
bot.on('start', () => {})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (message) => {
    if (message.type !== 'message' || message.subtype === 'bot_message' || message.subtype === 'message_replied') {
        return;
    }
    handleMessage(message);
})

// Response Handler
function handleMessage(message) {
    var searchTerm = message.text;
    var replyChannel = message.channel
    var checkword = searchTerm.toLowerCase();
    if (checkword.includes("hi") || checkword.includes("hello") || checkword.includes("sally")) {
        responseText = `Welcome to PX-Pete \n\n` +
            `Please enter *Account Name* or *User Email*`;
        const params = {
            icon_emoji: ':female-technologist:'
        }

        bot.postMessage(
            replyChannel,
            responseText,
            params
        );
    } else if (searchTerm.includes("@")) {
        var pattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim;
        searchTerm = searchTerm.match(pattern);
        searchPXUser(searchTerm[0], replyChannel)

    } else
        searchPXAccounts(searchTerm, replyChannel)
}

// //Fetch Account Data
function searchPXAccounts(searchTerm, replyChannel) {
    const config = {
        headers: {
            'X-APTRINSIC-API-KEY': `${process.env.PX_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }
    const queryParameters = querystring.stringify({
        sort: '-customAttributes.MAU',
        filter: `name~*${searchTerm}*`
    })
    const requestURL = `https://api.aptrinsic.com/v1/accounts?${queryParameters}`
    axios(requestURL, config)
        .then(res => {
            const responseData = res.data;
            if (responseData.accounts && responseData.accounts.length >= 1) {
                // `:smile: ${quote} - *${author}*`,
                const accountData = responseData.accounts[0]
                const accountCustomAttributes = accountData.customAttributes
                const tagInstallDate = new Date(accountCustomAttributes.tagInstallDate);
                const responseText = `Here is the summary of *${accountData.name}*\n\n` +
                    `>:man-woman-girl-girl:  MAU: ${accountCustomAttributes.MAU.toLocaleString()}\n\n` +
                    `>:arrow_up_down:  MAU 3 Months Trend: ${accountCustomAttributes.MAU3MonthsTrend}\n\n` +
                    `>:date:  Tag Installed: ${tagInstallDate.toLocaleDateString()}\n\n` +
                    `>:office_worker:  CSM Name: ${accountCustomAttributes.CSMNameGonG}\n\n` +
                    `>:evergreen_tree:  Features: ${accountCustomAttributes.NumberOfFeatures}\n\n` +
                    `>:ring:  Engagements: ${accountCustomAttributes.NumberOfEngagements}\n\n` +
                    `>:wave:  Active Engagements: ${accountCustomAttributes.activeEngagementsCount}\n\n` +
                    `>:large_orange_diamond:  SFDC Pull?: ${accountCustomAttributes.sfdcPullEnabled ? "Yes" : "No"}\n\n`;

                const params = {
                    icon_emoji: ':female-technologist:'
                }

                bot.postMessage(
                    replyChannel,
                    responseText,
                    params
                );
            } else {
                const responseText = `No Account found with name : *${searchTerm}*`;
                const params = {
                    icon_emoji: ':female-technologist:'
                }

                bot.postMessage(
                    replyChannel,
                    responseText,
                    params
                );
            }

        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
}

//Fetch User Data
function searchPXUser(searchTerm, replyChannel) {
    const config = {
        headers: {
            'X-APTRINSIC-API-KEY': `${process.env.PX_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    const queryParameters = querystring.stringify({
        sort: '-numberOfVisits',
        filter: `email~*${searchTerm}*`
    })
    const requestURL = `https://api.aptrinsic.com/v1/users?${queryParameters}`

    axios(requestURL, config)
        .then(res => {
            const responseData = res.data;
            if (responseData.users && responseData.users.length >= 1) {
                // `:smile: ${quote} - *${author}*`,
                const userData = responseData.users[0]
                const location = userData.lastInferredLocation;
                signupdate = new Date(userData.signUpDate);

                const responseText = `Here is the summary of *${userData.email}*\n\n` +
                    `>:astronaut:  First Name: ${userData.firstName}\n\n` +
                    `>:name_badge:  Last Name: ${userData.lastName}\n\n` +
                    `>:id:  Account Id: ${userData.accountId.toString()}\n\n` +
                    `>:earth_americas: Country Name: ${location.countryName}\n\n` +
                    `>:repeat: Number of Visits: ${userData.numberOfVisits.toString()}\n\n` +
                    `>:technologist: Role: ${userData.role}\n\n` +
                    `>:watch: Sign up Date: ${signupdate}\n\n`;

                //`>:office_worker:  CSM Name: ${userData.CSMNameGonG}\n\n` +
                //`>:evergreen_tree:  Features: ${userData.NumberOfFeatures}\n\n` +
                //`>:ring:  Engagements: ${userData.NumberOfEngagements}\n\n` +
                //`>:wave:  Active Engagements: ${userData.activeEngagementsCount}\n\n` +
                //`>:large_orange_diamond:  SFDC Pull?: ${userData.sfdcPullEnabled ? "Yes" : "No"}\n\n`;

                const params = {
                    icon_emoji: ':female-technologist:'
                }

                bot.postMessage(
                    replyChannel,
                    responseText,
                    params
                );
            } else {
                const responseText = `No User found with name : *${searchTerm}*`;
                const params = {
                    icon_emoji: ':female-technologist:'
                }

                bot.postMessage(
                    replyChannel,
                    responseText,
                    params
                );
            }

        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
}

// Slack App directory submission 302 server
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

    if (req.url == '/') {
        res.writeHead(302, { "Location": "https://" + 'slack.com' });
        return res.end();
    } else {
        fs.readFile(req.url.substring(1),
            function(err, data) {
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
            });
    }
}).listen(`${process.env.PORT}`, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});