const { shuffle } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("shuffle: ",args);
        shuffle(message);
    }
}
