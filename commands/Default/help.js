const data = require('../commands.json');
module.exports = {
    callback: (message, ...args) => {
        console.log("help: ",args);
        var txt = "";
        for(var index in data) { 
            txt+= index + ", ";
        }
        message.reply(`**Available Commands**: ${txt.slice(0, -2)}`);
    },
}
//TODO filter za komande, da se filteruje da li je komanda aktivna i da li je ispravna
//TODO dodaj argumente za svaki, kad se pojavi argument koji se uklapa u neko ime od commands.json onda iz tog objekta izvuci desc i printuj ga