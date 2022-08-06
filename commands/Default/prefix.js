const { PermissionFlagsBits } = require("discord.js")
const { getServerData, setServerData } = require("../../ServerData.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("prefix: ",args);
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
        getServerData(message, "prefix", (prefix) => {
            if (args == "") {message.channel.send(`Current prefix is: "**${prefix}**"`)}
            else {
                const newprefix = args.shift()
                setServerData(message,"prefix", newprefix, () => {
                    message.channel.send(`✅ | Prefix changed to: "**${newprefix}**"`);
                })
            }
        })
    }
}
