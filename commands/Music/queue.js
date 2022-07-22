const queue = require('../../music-logic.js').queue;
module.exports = {
    callback: (message, ...args) => {
        console.log("queue: ",args);
        queue(message);
    }
}
