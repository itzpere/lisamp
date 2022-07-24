const { clear } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("clear: ",args);
        clear(message);
    }
}
