const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: 3243773 });


client.on('ready', () => {
	let handler = require('./command-handler.js')
	//let music = require('./music-logic.js')
	if (handler.default) handler = handler.default
	handler(client);
	const music = require('./music-logic.js')
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
console.log("Token: OK")

/* config.json:

{
	"token"   : "YourToken",
	"clientId": "YourClientID",
	"guildId" : "YourGuildId",
  	"prefix"  : "!",
	"suffix"  : ".js"
}

*/