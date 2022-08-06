const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: 3276541 });

client.on('ready', () => {
	require("./ServerData.js")
	require('./command-handler.js')
	require('./music-logic.js')
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
module.exports = client;
console.log("Token: OK")