const { repeat, check } = require('../../music-logic.js');
const { prefix } = require('../../config.json');
module.exports = {
    callback: (message, ...args) => {
        console.log("repeat: ",args);
        let num = 0;
        let arg = ""
        function howtouse(){
            message.channel.send(`Right form for using this command is:\n**${prefix}repeat [option]**\nAvailable options: **OFF**, **TRACK**, **QUEUE**, **AUTOPLAY**\n*For more info type: **${prefix}help repeat***`)
        }
        if(!check(message)) return;
        if (args == undefined || args == "") {return howtouse();}
        arg = args.shift().toLowerCase();
        switch (arg){
            case "off":
                num = 0;
                repeat(message, num);
                break;
            case "track":
                num = 1;
                repeat(message, num);
                break;
            case "queue":
                num = 2;
                repeat(message, num);
                break;
            case "autoplay":
                num = 3;
                repeat(message, num);
                break;
            default:
                howtouse();
                break;
            }
    }
}
