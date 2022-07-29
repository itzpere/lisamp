const data = require('../commands.json');
const { getServerData } = require("../../ServerData.js")
module.exports = {
    callback: (message, ...args) => {
        console.log("help: ",args);
        let prefix = getServerData(message, "prefix")
        let txt = "";
        const excluded = ["help"]; //commands you dont want to show
        let arg = args.shift();
        if (arg !== undefined)
        {
            for(var index in data) { 
                if (index == arg){
                message.reply(`**Name**: ${arg}\n**Description**: ${data[arg]?.Description}\n**Usage**: ${prefix}${data[arg]?.Usage}`);
                }
            }
        }
        else {
        for(var index in data) { 
            if (!excluded.includes(index)){
            txt+= index + ", ";
            }
        }
        message.reply(`**Available Commands**: ${txt.slice(0, -2)}\nYou can also take a look at wiki: **https://github.com/itzpere/lisamp/wiki**`);
    }
    },
}