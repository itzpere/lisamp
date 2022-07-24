const { queue } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("queue: ",args);
        queue(message);
    }
}
