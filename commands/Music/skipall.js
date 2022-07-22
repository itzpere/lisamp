const skipall = require('../../music-logic.js').skipall;
module.exports = {
    callback: (message, ...args) => {
        console.log("skipall: ",args);
        skipall(message);
    }
}
