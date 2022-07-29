const config = require("../../embeds.js").serverConfig;
module.exports = {
    callback: (message, ...args) => {
        console.log("config: ",args);
        config(message)
    },
}
