const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: 3276541 });


client.on('ready', () => {
	require("./ServerData.js")
	const handler = require('./command-handler.js')
	if (handler.default) handler = handler.default
	handler(client);
	require('./music-logic.js')
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
console.log("Token: OK")