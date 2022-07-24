const { jump } = require('../../music-logic.js');
module.exports = {
    callback: (message, ...args) => {
        console.log("jump: ",args);
        jump(message,args);
    }
}
