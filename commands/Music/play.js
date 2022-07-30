const { music } = require('../../music-logic.js');
const { getServerData } = require("../../ServerData")
const { Permissions } = require("discord.js")
let can = true
module.exports = {
    callback: async (message, ...args) => {
        console.log("play: ",args);
        let musicrole = getServerData(message, "musicrole")
        if (musicrole != "" && !message.member.roles.cache.some(role => role.name == musicrole) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){return message.channel.send(`You need to have role called "**${musicrole}**" to use this command`)}
        
        let song = "";
        while(args.length){
            song += args.shift() + " ";
        }
        await waitFor(_ => can === true);
        can = false;
        await music(message, song);
        can = true
    }
}

function waitFor(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
  
    return new Promise(poll);
  }