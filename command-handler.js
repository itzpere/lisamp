const fs = require('fs');
const getFiles = require('./get-files');
const { prefix, clientId, suffix} = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = (client) => {
const commands = {};

const commandFiles = getFiles('./commands', suffix);
console.log("Found these command files :\n", commandFiles);

for (const command of commandFiles) {
    let commandFile = require(command)
    if (commandFile.default) commandFile = commandFile.default;
    const split = command.replace(/\\/g,'/').split('/');
    const commandName = split[split.length - 1].replace(suffix,'')
    commands[commandName.toLowerCase()] = commandFile;
    //todo add /slash commands
    }
console.log("Commands are :\n",commands);
client.on('messageCreate', (message) => {
    if(message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands[commandName]) {
        return;
    }
    try {
        commands[commandName].callback(message, ...args)
    } catch (error) {
        console.error(error)
    }
  })
}