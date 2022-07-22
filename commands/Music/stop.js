const stop = require('../../music-logic.js').leave;
module.exports = {
    callback: (message, ...args) => {
        console.log("stop: ",args);
        stop(message);
    }
}
