require("discord-player/smoothVolume");
const { Client, Intents } = require ('discord.js');
const { Player } = require("discord-player");
const playdl = require("play-dl");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = new Player(client);


module.exports = () =>{
    player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
    console.log("currently playing loaded");
}

//play
async function musicplay(message, song){
    if (message !== undefined){
        if (song == undefined || song === ""){return message.reply("❌ | Please specify the song")};
        console.log("musicplay function is called");
        if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
        const query = song;
        const queue = player.createQueue(message.guild, {
            metadata: {
            channel: message.member.voice.channel},
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube") {
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
return await message.reply({ content: `⏱️ | Loading track **${track.title}**!` });
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
function skipall(message) {
    if(message!== undefined){
    const queue = player.getQueue(message.guild)
    queue.destroy();
    }
}

module.exports.music = musicplay;
module.exports.skip = skip;
module.exports.skipall = skipall;
//TODO add now playing or perhaps fix it
console.log("Music-Logic: OK")