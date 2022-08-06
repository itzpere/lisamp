module.exports = {
    callback: (message, ...args) => {
        require("./queue.js").callback(message, ...args);
    }
}
