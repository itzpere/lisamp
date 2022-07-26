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
        
        if (args == undefined) {message.channel.send(`Current prefix is ${getServerData(message.guild, "prefix")}`)}
        else {
            const newprefix = args.shift()
            const file = getServerData(message.guild, "file")
            await setValue(file, newprefix)
            
        }
    }
}
