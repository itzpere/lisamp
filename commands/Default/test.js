
const { addNG } = require("./serverpref.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("test: ",args);
            addNG(message.guild);
    }
}
