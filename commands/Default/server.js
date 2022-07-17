const { guildId } = require('../../config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const guild = client.guilds.cache.get(guildId);

module.exports = {
    callback: (message, ...args) => {

        console.log("Server name: ",args);
        message.reply(`Server name: ${guild.name}\nTotal members: ${guild.memberCount}`);
        
    },
}