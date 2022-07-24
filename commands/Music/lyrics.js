const { lyrics } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("lyrics: ",args);
        lyrics(message);
    }
}
