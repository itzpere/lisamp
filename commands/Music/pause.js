const { pause } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("pause: ",args);
        pause(message);
    }
}
