const { getFirestore } = require('firebase-admin/firestore');
const {
    parseMessage
} = require('../helpers/parsers');

const {
    boniatoCommand
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
                if (command === 'boniato') {
                    // Nacho command handler
                    boniatoCommand(connection);
                }
            }
            console.log(`${newMessage.source.nick}:${newMessage.parameters}`);
            logger.info(`${newMessage.source.nick}:${newMessage.parameters}`);
            const fireStore = getFirestore();
            if (newMessage.source.nick) {
                fireStore.collection('users').doc(newMessage.source.nick).set({});

            }

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