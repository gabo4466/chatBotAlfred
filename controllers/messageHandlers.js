const messageHandler = (message) => {
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
        }


    }
}

const ircHandler = (ircMessage) => {
    if (ircMessage.type === 'utf8') {
        let rawIrcMessage = ircMessage.utf8Data.trimEnd();
        let messages = rawIrcMessage.split('\r\n');
        messages.forEach(messageHandler);
    }
}

module.exports = {
    messageHandler,
    ircHandler
}