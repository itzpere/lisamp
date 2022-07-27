const { repeat, check } = require('../../music-logic.js');
const fs = require("fs")
module.exports = {
    callback: (message, ...args) => {
        console.log("repeat: ",args);
        const { getServerData } = require("../../ServerData.js")
        let prefix = getServerData(message, "prefix") 
        let num = 0;
        let arg = ""
        function howtouse(){
            message.channel.send(`Right form for using this command is:\n**${prefix}repeat [option]**\nAvailable options: **OFF**, **TRACK**, **QUEUE**, **AUTOPLAY**,**CURRENT**,**DEFAULT**\n*For more info type: **${prefix}help repeat***`)
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
            case "default":
                switch (args.shift().toLowerCase()){
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
                        howtouse();
                        break;
                }
            default:
                howtouse();
                break;
        }
        
        async function setdefaultrepeat (num){
            const setValue = (fn, value) => {
                fs.readFile(fn)
                .then(body => JSON.parse(body))
                .then(json => {
                    json.repeat = value
                    return json
                })
                .then(json => JSON.stringify(json))
                .then(body => fs.writeFile(fn, body, (err) => err && console.error(err)))
                .catch(error => console.warn(error))
                }
        const file = getServerData(message, "file")
        await setValue(file, num)
        message.channel.send(`Default repeat is set to: **${num}**\nReload the q for changes to take effect`)
        }

    }
}
