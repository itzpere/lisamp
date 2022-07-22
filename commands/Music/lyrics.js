const lyrics = require('../../music-logic.js').lyrics;
module.exports = {
    callback: (message, ...args) => {
        console.log("lyrics: ",args);
        lyrics(message);
    }
}
