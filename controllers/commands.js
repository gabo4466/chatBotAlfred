const fs = require('fs');


const boniatoCommand = (connection) => {

    let messagesTemplates = JSON.parse(fs.readFileSync('assets/messages.json', 'utf8'));
    let channel = `#${process.env.channel}`
    connection.sendUTF(`PRIVMSG ${channel} : ${messagesTemplates.boniato.message}`);
}


module.exports = {
    boniatoCommand
}