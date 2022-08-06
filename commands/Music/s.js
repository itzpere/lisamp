module.exports = {
    callback: (message, ...args) => {
        require("./skip.js").callback(message, ...args);
    }
}
