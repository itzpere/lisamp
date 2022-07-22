module.exports = {
    callback: (message, ...args) => {
        const stop = require("./stop.js").callback(message, ...args);
    }
}
