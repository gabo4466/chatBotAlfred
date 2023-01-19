const fs = require('fs');


const nachoCommand = (connection) => {

    let messagesTemplates = JSON.parse(fs.readFileSync('assets/messages.json', 'utf8'));
    let channel = `#${process.env.channel}`
    connection.sendUTF(`PRIVMSG ${channel} : ${messagesTemplates.nacho.message}`);
}


module.exports = {
    nachoCommand
}