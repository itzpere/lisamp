module.exports = {
    callback: async (message, ...args) => {
        console.log("prefix: ",args);
        const fs = require('fs').promises
        const { getServerData } = require("../../ServerData.js")
        let prefix = getServerData(message, "prefix")
        
        const setValue = (fn, value) => 
        fs.readFile(fn)
        .then(body => JSON.parse(body))
        .then(json => {
            json.prefix = value
            return json
        })
        .then(json => JSON.stringify(json))
        .then(body => fs.writeFile(fn, body))
        .catch(error => console.warn(error))
        
        if (args == "") {message.channel.send(`Current prefix is: **${prefix}**`)}
        else {
            const newprefix = args.shift()
            const file = getServerData(message, "file")
            await setValue(file, newprefix)
            message.channel.send(`Prefix changed to: ${newprefix}`);
        }
    }
}
