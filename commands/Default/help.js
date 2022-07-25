const data = require('../commands.json');
const {prefix} = require('../../config.json');
module.exports = {
    callback: (message, ...args) => {
        console.log("help: ",args);
        var txt = "";
        const excluded = [""]; //commands you dont want to show
        var arg = args.shift();
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