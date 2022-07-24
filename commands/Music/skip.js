const { skip } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("skip: ",args);
        skip(message);
    }
}
