const clear = require('../../music-logic.js').clear;
module.exports = {
    callback: (message, ...args) => {
        console.log("clear: ",args);
        clear(message);
    }
}
