
// importing discord and its relevant classes
const { Client, Intents, Discord } = require('discord.js');
const token = "OTk2ODM2OTg2OTQ4MTU3NDYw.GYte0H.ddc1kYyNi8v29-Lnhq3_eKpKfxnM4If6Nryxqg";
const client = new Discord.Client({ 
    intents : intents.ALL

 });

const PREFIX = "!";

const fs = require('fs');

client.commands = new Discord.Collection();

// Implementing command folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

// listening for event to notify progress
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    })

//commands
client.on('interactionCreate', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.substring(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command){
        case 'hello':
            client.command.get('hello').execute(message, args);
        break;
        case 'clear':
            client.command.get('clear').execute(message, args);
        break;
        case 'play':
            client.command.get('play').execute(message, args);
        break;
        case 'leave':
            client.command.get('leave').execute(message, args);
        break;
    }
})

//super sercet token
client.login(token);


// https://www.youtube.com/watch?v=fN29HIaoHLU