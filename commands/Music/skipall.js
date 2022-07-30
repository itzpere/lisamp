const skipall = require('../../music-logic.js').leave;
const { getServerData } = require("../../ServerData")
const { Permissions } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("skipall: ",args);
        let musicrole = getServerData(message, "musicrole")
        if (musicrole == "" && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        skipall(message);
    }
}
