const { Permissions } = require("discord.js")
const { getServerData, setServerData } = require("../../ServerData.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("test: ",args);
        getServerData(message,"prefix", (prefix) =>{
            message.channel.send(`test done: ${prefix}`)
        })
        setServerData(message,"prefix",args.slice())
        getServerData(message,"prefix", (prefix) =>{
            message.channel.send(`test done: ${prefix}`)
        })
        
    }
}