const WebSocketClient = require('websocket').client;
require('dotenv').config()

const {
    parseMessage
} = require('./parsers');

const {
    ircHandler
} = require('./controllers/messageHandlers');
const {
    onClose,
    onError
} = require('./controllers/configHandlers');


const client = new WebSocketClient();
const channel = `#${process.env.channel}`;
const account = process.env.channel;
const password = `oauth:${process.env.oauth}`;

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');

    // Set auth && channel data
    connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
    connection.sendUTF(`PASS ${password}`);
    connection.sendUTF(`NICK ${account}`);
    connection.sendUTF(`JOIN ${channel},${channel}`);

    // Adding handlers for socket events

    connection.on('error', onError);

    // Event on close connection
    connection.on('close', onClose);

    // Process the Twitch IRC message.
    connection.on('message', ircHandler);

});

client.connect('ws://irc-ws.chat.twitch.tv:80');



