const { leave } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("stop: ",args);
        leave(message);
    }
}
