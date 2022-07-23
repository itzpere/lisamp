const join = require('../../music-logic.js').join;
module.exports = {
    callback: (message, ...args) => {
        console.log("join: ",args);
        join(message);
    }
}
