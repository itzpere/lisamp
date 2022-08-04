const { skip } = require('../../music-logic.js');
const { getServerData } = require("../../ServerData")
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("skip: ",args);
        let musicrole = getServerData(message, ["musicrole"])
        if (musicrole != "" && !message.member.roles.cache.some(role => role.name == musicrole) && !message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        skip(message);
    }
}
