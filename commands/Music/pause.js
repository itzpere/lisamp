const { pause } = require('../../music-logic.js');
const { getServerData } = require("../../ServerData")
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("pause: ",args);
        let musicrole = getServerData(message, ["musicrole"])
        if (musicrole != "" && !message.member.roles.cache.some(role => role.name == musicrole) && !message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        pause(message);
    }
}
