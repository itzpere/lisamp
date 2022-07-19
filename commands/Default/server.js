const { guildId } = require('../../config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: 3243773 });
//const guild = client.guilds.cache.get(guildId);
module.exports = {
    callback: (message, ...args) => {

        console.log("Server name: ",args);
        console.log(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        message.reply(`**Server name**: ${message.guild.name}\n**Total members**: ${message.guild.memberCount}\n**Created at**: ${message.guild.createdAt}\n`);
    },
}