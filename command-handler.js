const fs = require('fs');
const getFiles = require('./get-files');
const { prefix, clientId} = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = (Client) => {
const command = {};

const suffix = '.js';

const commandFiles = getFiles('./commands', suffix);
console.log(commandFiles);

for (const command of commandFiles) {
    let commandFile = require(command)
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g,'/').split('/');
    const commandName = split[split.length - 1].replace(suffix,'')

    }
console.log(command)
client.on('messageCreate', (message) => {
    if(message.author.bot || !message.content.startWith(prefix)) {
        return;
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!command[commandName]) {
        return;
    }
    try {
        command[commandName].callback(message, ...args)
    } catch (error) {
        console.error(error)
    }
  })
}