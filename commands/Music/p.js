const music = require('../../music-logic.js').music;
module.exports = {
    callback: (message, ...args) => {
        console.log("play: ",args);
        let song = "";
        while(args.length){
            song += args.shift() + " ";
        }
        music(message, song);
    }
}
