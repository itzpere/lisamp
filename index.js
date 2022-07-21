const { token, prefix } = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: 3243773 });
const { Player } = require("discord-player");
require("discord-player/smoothVolume");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
	let handler = require('./command-handler.js')
	let music = require('./music-logic.js')
	if (handler.default) handler = handler.default

	handler(client);
  });
  
client.login(token);
console.log("Token: OK")

/* config.json:

{
	"clientId": "YourClientID",
	"token"   : "YourToken",
	"guildId" : "YourGuildId",
  	"prefix"  : "!",
	"suffix"  : ".js"
}

*/