module.exports = {
    callback: (message, ...args) => {
        require("./play.js").callback(message, ...args);
    }
}
