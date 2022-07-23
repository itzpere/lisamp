const repeat = require('../../music-logic.js').repeat;
const { prefix } = require('../../config.json');
module.exports = {
    callback: (message, ...args) => {
        console.log("repeat: ",args);
        let num = 0;
        let arg = ""
        function howtouse(){
            message.channel.send(`Right form for using this command is:\n**${prefix}repeat [option]**\nAvailable options: **OFF**, **TRACK**, **QUEUE**, **AUTOPLAY**\n*For more info type: **${prefix}help repeat***`)
        }
        if (args == undefined || args == "") {return howtouse();}
        arg = args.shift().toLowerCase();
        switch (arg){
            case "off":
                num = 0
                message.channel.send("repeat is set to off")
                break;
            case "track":
                num = 1
                message.channel.send("repeat is set to track")
                break;
            case "queue":
                num = 2
                message.channel.send("repeat is set to queue")
                break;
            case "autoplay":
                num = 3
                message.channel.send("repeat is set to autoplay")
                break;
            default:
                howtouse();
                break;
            }
        
        repeat(message, num);
    }
}
