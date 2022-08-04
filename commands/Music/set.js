const { PermissionFlagsBits } = require("discord.js")
const { setServerData } = require("../../ServerData")
module.exports = {
    callback: (message, ...args) => {
        console.log("set: ",args);
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        let roleName = args.shift()
        let role = message.guild.roles.cache.find(x => x.name === roleName);
        if (role === undefined) {
            return message.channel.send(`❌ | Role named "**${roleName}**" doesn't exist`)
        } else {
            setServerData(message, "musicrole", roleName)
            return message.channel.send(`✅ | New settings **successfully** applied\nFrom now on you will need role called "**${roleName}**" to be able to use music commands`)
        }
    }
}
