
module.exports = {
    callback: (message, ...args) => {
        const { getServerData } = require("../../ServerData.js")
        console.log("test: ",args);
        console.log(getServerData(message.guild, args.shift()));
    }
}