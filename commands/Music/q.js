module.exports = {
    callback: (message, ...args) => {
        const queue = require("./queue.js").callback(message, ...args);
    }
}
