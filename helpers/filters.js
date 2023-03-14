const fs = require('fs');
function filterSpoilers(message, user, connection) {
    let spoilers = JSON.parse(fs.readFileSync('assets/spoilers.json', 'utf8'));
    let words = message.split(' ');
    words.forEach(word => {
        console.log(spoilers);
        let channel = `#${process.env.channel}`
        spoilers.naruto.forEach(spoiler => {
            if (spoiler == word) {
                console.log(spoiler + " TIMEOUT :" + user);
                // connection.sendUTF(`PRIVMSG ${channel} :/timeout ${user} 10`);
                connection.sendUTF(`PRIVMSG ${channel} :/clear`);
            }
        });
    });

}


module.exports = {
    filterSpoilers
}