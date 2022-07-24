const jump = require('../../music-logic.js').jump;
module.exports = {
    callback: (message, ...args) => {
        console.log("jump: ",args);
        jump(message,args);
    }
}
