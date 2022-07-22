module.exports = {
    callback: (message, ...args) => {
        const play = require("./play.js").callback(message, ...args);
    }
}
