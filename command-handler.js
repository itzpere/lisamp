const getFiles = require('./get-files');
const { getServerData, restartToDefaultData } = require("./ServerData.js")
const { Client, Intents, Formatters, Guild} = require('discord.js');
const client = new Client({ intents: 3243773 });
const suffix = ".js"

module.exports = (client) => {
    const commands = {};

const commandFiles = getFiles('./commands', suffix);
//console.log("Found these command files :\n", commandFiles);
console.log(`   Found ${commandFiles.length} commands`)

for (const command of commandFiles) {
    let commandFile = require(command)
    if (commandFile.default) commandFile = commandFile.default;
    const split = command.replace(/\\/g,'/').split('/');
    const commandName = split[split.length - 1].replace(suffix,'')
    commands[commandName.toLowerCase()] = commandFile;
    //todo add /slash commands
    }
//console.log("Commands are :\n",commands);
client.on('messageCreate', (message) => {
    if (message.content === "!restartconfig"){console.log("writing config to default settings");restartToDefaultData(message.guild);return message.channel.send("✅ | Config has been restarted to default settings")}
    try{
        let prefix = getServerData(message, "prefix")
        if (message.mentions.users.has(message.guild.me.id)) {return message.channel.send(`Hi\nCurrent prefix is: **${prefix}**`);return;}
        if (message.author.bot || !message.content.startsWith(prefix)) {return;}
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
    }
    catch{
        restartToDefaultData(message.guild); console.log("\x1b[31m","Writing config to default settings because of an error","\x1b[0m")
        message.channel.send("⚠️ | It looks like there has been an **error**, config was **restarted to default**")
    }
  })
}
console.log("Command-Handler: OK")