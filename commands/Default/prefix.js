module.exports = {
    callback: (message, ...args) => {
        console.log("prefix: ",args);
        const { getServerData, setServerData } = require("../../ServerData.js")
        let prefix = getServerData(message, "prefix")
        if (args == "") {message.channel.send(`Current prefix is: "**${prefix}**"`)}
        else {
            const newprefix = args.shift()
            const file = getServerData(message, "file")
            setServerData(message,"prefix", newprefix)
            message.channel.send(`Prefix changed to: "**${newprefix}**"`);
        }
    }
}
