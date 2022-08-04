const { repeat, check } = require('../../music-logic.js');
const { getServerData, setServerData } = require("../../ServerData.js")
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("repeat: ",args);
        array = getServerData(message, ["musicrole","prefix"])
        let musicrole = array[0]
        let prefix = array[1]
        if (musicrole != "" && !message.member.roles.cache.some(role => role.name == musicrole) && !message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        let num = 0;
        let arg = ""
        function howtouse(){
            message.channel.send(`Right form for using this command is:\n**${prefix}repeat [option]**\nAvailable options: **OFF**, **TRACK**, **QUEUE**, **AUTOPLAY**,**DEFAULT**\n*For more info type: **${prefix}help repeat***`)
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
            case "default":
                if(!message.member.permissions.has(PermissionFlagsBits.Administrator)){return message.channel.send("❌ | You need to have administrator privileges to use this command")}
                try{var ar = args.shift().toLowerCase()}
                catch{ar = "a"}
                switch (ar){
                    case "off":
                        num = 0;
                        setdefaultrepeat(num);
                        break;
                    case "track":
                        num = 1;
                        setdefaultrepeat(num);
                        break;
                    case "queue":
                        num = 2;
                        setdefaultrepeat(num);
                        break;
                    case "autoplay":
                        num = 3;
                        setdefaultrepeat(num);
                        break;
                    default:
                        message.channel.send("Specify the correct option for default")
                        break;
                }
        }
        function setdefaultrepeat (value) {
        setServerData(message,"repeat",value)
        message.channel.send(`✅ | Default repeat is set to: **${num}**\nReload the q for changes to take effect`)
        }
    }
}
