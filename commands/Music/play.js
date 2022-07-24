const music = require('../../music-logic.js').music;
module.exports = {
    callback: async (message, ...args) => {
        console.log("play: ",args);
        let song = "";
        while(args.length){
            song += args.shift() + " ";
        }
        await music(message, song);
    }
}
