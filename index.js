const WebSocketClient = require('websocket').client;
require('dotenv').config()

const {
    parseMessage
} = require('./parsers');

// TODO: IMPORT PARSERS FROM PARSERS FILE

const client = new WebSocketClient();
const channel = `#${process.env.channel}`;
const account = process.env.channel;
const password = `oauth:${process.env.oauth}`;

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');

    connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
    connection.sendUTF(`PASS ${password}`);
    connection.sendUTF(`NICK ${account}`);
    connection.sendUTF(`JOIN ${channel},${channel}`);


    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function () {
        console.log('Connection Closed');
        console.log(`close description: ${connection.closeDescription}`);
        console.log(`close reason code: ${connection.closeReasonCode}`);
    });

    // Process the Twitch IRC message.

    connection.on('message', function (ircMessage) {
        if (ircMessage.type === 'utf8') {
            let rawIrcMessage = ircMessage.utf8Data.trimEnd();
            let messages = rawIrcMessage.split('\r\n');
            messages.forEach(messageHandler);
        }
    });

});

client.connect('ws://irc-ws.chat.twitch.tv:80');

function messageHandler(message) {
    let newMessage = parseMessage(message);
    if (newMessage) {

        console.log(newMessage);

        // Message has content
        if (newMessage.parameters) {

            let command = newMessage.command.botCommand
            // is Message a botCommand
            if (command) {
                // Which command?
                if (command === 'nacho') {
                    // Nacho command handler
                }


            }
            // console.log(`${newMessage.source.nick}: ${newMessage.parameters}`);
        }


    }
}

