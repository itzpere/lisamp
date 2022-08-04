const config = require("../../embeds.js").serverConfig;
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("config: ",args);
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        config(message)
    },
}
