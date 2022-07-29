const { Permissions } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("test: ",args);
        console.log(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR));
    }
}