const leave = require('../../music-logic.js').leave;
module.exports = {
    callback: (message, ...args) => {
        console.log("leave: ",args);
        leave(message);
    }
}
