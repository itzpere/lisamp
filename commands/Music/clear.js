const clear = require('../../music-logic.js').clear;
module.exports = {
    callback: (message, ...args) => {
        console.log("skip: ",args);
        clear(message);
    }
}
