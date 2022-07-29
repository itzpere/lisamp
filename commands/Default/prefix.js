const { Permissions } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("prefix: ",args);
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        const { getServerData, setServerData } = require("../../ServerData.js")
        let prefix = getServerData(message, "prefix")
        if (args == "") {message.channel.send(`Current prefix is: "**${prefix}**"`)}
        else {
            const newprefix = args.shift()
            const file = getServerData(message, "file")
            setServerData(message,"prefix", newprefix)
            message.channel.send(`✅ | Prefix changed to: "**${newprefix}**"`);
        }
    }
}
