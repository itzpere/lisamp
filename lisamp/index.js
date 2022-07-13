// importing discord and its relevant classes
const { Client, Intents } = require('discord.js');
// Instantiate a new client
const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);
client.on('message', message => {
    if (message.content === '!hello') {
        message.channel.send('Hello World!');
    }
});
// listening for event to notify progress
client.on('ready', () => {
console.log("Connected as " + client.user.tag);
})

bot_secret_token = "OTk2ODM2OTg2OTQ4MTU3NDYw.GGZOD3.RWt20TOOHCslV1_mS4N1NhSxgb7i6u3s-GY5IY";

client.login(bot_secret_token);
