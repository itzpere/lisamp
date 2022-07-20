const data = require('../commands.json');
module.exports = {
    callback: (message, ...args) => {
        console.log("help: ",args);
        var txt = "";
        var arg = args.shift();
        if (arg !== undefined)
        {
            console.log("arg is not null: ", arg);
            for(var index in data) { 
                if (index == arg){
                console.log(index, " is ", arg);
                message.reply(`**Name**: ${arg}\n**Description**: ${data[arg]?.Description}`);
                }
            }
        }
        else {
        for(var index in data) { 
            txt+= index + ", ";
        }
        message.reply(`**Available Commands**: ${txt.slice(0, -2)}`);
    }
    },
}