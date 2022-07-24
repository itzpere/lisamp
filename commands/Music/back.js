const { back } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("back: ",args);
        back(message);
    }
}
