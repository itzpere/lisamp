module.exports = {
    callback: async (message, ...args) => {
        const fs = require('fs').promises
        const { getServerData } = require("../../ServerData.js")
        console.log("info: ",args);
        
        const setValue = (fn, value) => 
        fs.readFile(fn)
        .then(body => JSON.parse(body))
        .then(json => {
            // manipulate your data here
            json.prefix = value
            return json
        })
        .then(json => JSON.stringify(json))
        .then(body => fs.writeFile(fn, body))
        .catch(error => console.warn(error))
        
        if (args == "") {message.channel.send(`Current prefix is: ${getServerData(message, "prefix")}`)}
        else {
            const newprefix = args.shift()
            const file = getServerData(message, "file")
            await setValue(file, newprefix)
            message.channel.send(`Prefix changed to: ${newprefix}`);
        }
    }
}
