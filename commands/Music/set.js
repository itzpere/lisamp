const { Permissions, RoleManager } = require("discord.js")
const { setServerData } = require("../../ServerData")
module.exports = {
    callback: (message, ...args) => {
        console.log("set: ",args);
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        let roleName = args.shift()
        if (roleName == undefined || roleName == ""){
            return message.channel.send(`❌ | You should specify how is the role called`)
        }
        let role = message.guild.roles.cache.find(x => x.name === roleName);
        if (role === undefined) {
            return message.channel.send(`Role named "**${roleName}**" doesn't exist`)
        } else {
            setServerData(message, "musicrole", roleName)
            return message.channel.send(`New settings **successfully** applied\nFrom now on you will need role called "**${roleName}**" to be able to use music commands`)
        }
    }
}
