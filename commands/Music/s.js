const skip = require('../../music-logic.js').skip;
module.exports = {
    callback: (message, ...args) => {
        console.log("skip: ",args);
        skip(message);
    }
}
