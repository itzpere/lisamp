const { lyrics } = require('../../music-logic.js');
const { getServerData } = require("../../ServerData")
const { Permissions } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("lyrics: ",args);
        let musicrole = getServerData(message, "musicrole")
        if (musicrole != "" && !message.member.roles.cache.some(role => role.name == musicrole) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        lyrics(message);
    }
}
