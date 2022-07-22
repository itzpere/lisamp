const pause = require('../../music-logic.js').pause;
module.exports = {
    callback: (message, ...args) => {
        console.log("pause: ",args);
        pause(message);
    }
}
