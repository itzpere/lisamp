module.exports = {
    callback: (message, ...args) => {
        const stop = require("./skip.js").callback(message, ...args);
    }
}
