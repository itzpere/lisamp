const config = require("../../embeds.js").serverConfig;
const { Permissions } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("config: ",args);
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        config(message)
    },
}
