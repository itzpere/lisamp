require("discord-player/smoothVolume");
const { Client, Intents } = require ('discord.js');
const { Reverbnation, Lyrics } = require("@discord-player/extractor");
const { Player } = require("discord-player");
const playdl = require("play-dl");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = new Player(client);
const lyricsClient = Lyrics.init();
player.use("reverbnation", Reverbnation);

//on event commands
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
player.on("botDisconnect", (queue) => queue.metadata.channel.send(`＼(-_- ) | i quit`))
player.on("queueEnd", (queue) => queue.metadata.channel.send(`＼(-_- )   | I quit`))
player.on("trackAdd", (queue, track) => queue.metadata.channel.send(`👌 | Added **${track.title}** to q`))

//variables
let pausebool = false; 



//play
async function musicplay(message, song){
    if (message !== undefined){
        if (song == undefined || song === ""){return message.reply("❌ | Please specify the song")};
        if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
        const query = song;
        const queue = player.createQueue(message.guild, {
            metadata: {
            channel: message.channel},
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube" || source === "soundcloud"){
                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
            }
        }
        });
    
    try {
    if (!queue.connection) await queue.connect(message.member.voice.channel);
} catch {
    queue.destroy();
    return await message.reply({ content: "Could not join your voice channel!", ephemeral: true });
}

const track = await player.search(query, {
    requestedBy: message.user
}).then(x => x.tracks[0]);
if (!track) return await message.reply({ content: `❌ | Track **${query}** not found!` });
queue.play(track);
message.channel.send(`⏱️ | Loading track **${track.title}**!`).then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
  .catch(console.error);
return;
}}

//skip
function skip (message) {
    if (message !== undefined){
    if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
    const q = player.getQueue(message.guild);
    message.reply(`⏭️ | Skipped track **${q.current}**`)
    return q.skip() 
}
}
//clear
function clear(message) {
    if(message!== undefined){
    const queue = player.getQueue(message.guild)
    queue.clear();
    }
}
//leave, skipall
function leave(message) {
    if(message!== undefined){
    const queue = player.getQueue(message.guild)
    queue.destroy();
    }
}
function pause(message) {
    if(message !== undefined){
    const queue = player.getQueue(message.guild)
    pausebool = !pausebool;
    queue.setPaused(pausebool)
    }
}
function lyrics(message){
    if(message !== undefined){
    const queue = player.getQueue(message.guild)
    if (queue !== undefined)
    lyricsClient.search(queue.current.title)
    .then(x => message.channel.send(x.lyrics))
    .catch(message.channel.send(`❌ | Unable to find any lyrics for ${queue.current.title}`),console.error);
    }
}
module.exports.music = musicplay;
module.exports.skip = skip;
module.exports.clear = clear;
module.exports.leave = leave;
module.exports.pause = pause;
module.exports.lyrics = lyrics;
//TODO add now playing or perhaps fix it
console.log("Music-Logic: OK")