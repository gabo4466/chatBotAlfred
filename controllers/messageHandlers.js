const {
    parseMessage
} = require('../helpers/parsers');

const {
    nachoCommand
} = require('./commands')

const logger = require('logger').createLogger('chatHistory.log');


function messageHandler(connection, message) {
    let newMessage = parseMessage(message);
    if (newMessage) {
        // console.log(newMessage);
        // Message has content
        if (newMessage.parameters && newMessage.source) {

            let command = newMessage.command.botCommand
            // is Message a botCommand
            if (command) {
                // Which command?
                if (command === 'nacho') {
                    // Nacho command handler
                    nachoCommand(connection);
                }
            }
            console.log(`${newMessage.source.nick}:${newMessage.parameters}`);
            logger.info(`${newMessage.source.nick}:${newMessage.parameters}`);
        }


    }
}

const ircHandler = (connection, ircMessage) => {
    if (ircMessage.type === 'utf8') {
        let rawIrcMessage = ircMessage.utf8Data.trimEnd();
        let messages = rawIrcMessage.split('\r\n');
        messages.forEach((message) => {
            messageHandler(connection, message)
        });
    }
}

module.exports = {
    ircHandler
}