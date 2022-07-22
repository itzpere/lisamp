const skipall = require('../../music-logic.js').leave;
module.exports = {
    callback: (message, ...args) => {
        console.log("skipall: ",args);
        skipall(message);
    }
}
