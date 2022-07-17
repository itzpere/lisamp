const { token, prefix } = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
	let handler = require('./command-handler.js')
	if (handler.default) handler = handler.default

	handler(client);
  });

client.login(token);