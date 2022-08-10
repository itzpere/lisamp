require("discord-player/smoothVolume");
const { Reverbnation, Lyrics } = require("@discord-player/extractor");
const { Player } = require("discord-player");
const { getServerData } = require("./ServerData.js")
const playdl = require("play-dl");
const embeds = require("./embeds.js");
const client = require('./index.js')
const player = new Player(client);

// configuration
const leaveMessage = `＼(-_- )  I quit`;


playdl.setToken({ youtube : { cookie : "" } }) //if you want to set coockie
const lyricsClient = Lyrics.init();
player.use("reverbnation", Reverbnation);

//variables
let pausebool = false; 

//on event commands
player.on("trackStart", (queue, track) => embeds.currentlyplaying(queue, track));
player.on("botDisconnect", (queue) => queue.metadata.channel.send(leaveMessage))
player.on("trackAdd", (queue, track) => queue.metadata.channel.send(`👌 | Added **${track.title}** to q`))
player.on('channelEmpty', (queue) => queue.metadata.channel.send(leaveMessage))

//check
function check (message){
    if(!message.member.voice.channel) {message.reply("❌ | Please connect to a voice channel!"); return false;}
    if (message.guild.members.me.voice.channel != null) {if (message.guild.members.me.voice.channel != message.member.voice.channel) {
        message.channel.send("❌ | You need to be connected to my voice") 
        return false;} else return true;} return true;
        
}

//play
async function musicplay(message, song){
    if (message !== undefined){
        if (song == undefined || song === ""){return message.channel.send("❌ | Please specify the song")};
        if(!check(message)) { return;}
        if(player.getQueue(message.guild) != undefined && message.guild.members.me.voice.channel == null) {player.getQueue(message.guild).destroy()}
        const query = song;
        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel,
                message : message
            },
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube" || source === "soundcloud"){
                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
                }
            }
            });
    try {
    if (!queue.connection) await queue.connect(message.member.voice.channel);
    getServerData(message, "repeat", (qrepeat) => {
        queue.setRepeatMode(qrepeat);
        console.log(`Default repeat is utilized and set to ${qrepeat}`);
    }); //sets default repeat
} catch {
    queue.destroy();
    return await message.reply({ content: "Could not join your voice channel!", ephemeral: true });
}
const track = await player.search(query, {
    requestedBy: message.user
}).then(x => x.tracks[0]);

if (!track){return await message.reply({ content: `❌ | Track **${query}** not found!` });}
message.channel.send(`⏱️ | Loading track **${track.title}**!`).then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
  .catch(console.error);
    if (track.playlist === undefined){
    queue.play(track);
    }else{
    queue.addTracks(track.playlist.tracks);
    queue.play()}
if (queue.current == undefined){
    await new Promise(resolve => setTimeout(resolve, 5000));
}
return;
}}

//skip
function skip (message) {
    if (message !== undefined){
    if(!check(message)) return;
    if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
    const q = player.getQueue(message.guild);
    message.reply(`⏭️ | Skipped track **${q.current}**`)
    return q.skip() 
}
}
//clear
function clear(message) {
    if(message!== undefined){
    if(!check(message)) return;
    if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
    const queue = player.getQueue(message.guild)
    queue.clear();
    }
}
//leave, skipall
function leave(message) {
    if(message!== undefined){
    if(!check(message)) return;
    const queue = player.getQueue(message.guild)
    if (queue)
    queue.destroy();
    }
}
//pause
function pause(message) {
    if(message !== undefined){
    if(!check(message)) return;
    if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
    const queue = player.getQueue(message.guild)
    pausebool = !pausebool;
    queue.setPaused(pausebool)
    if (pausebool === false){
        message.channel.send("✅ | UnPaused")
    }
    else{
    message.channel.send("✅ | Paused");
    }
  }
}
//lyrics
function lyrics(message){
    if(message !== undefined){
    const queue = player.getQueue(message.guild)
    if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
    lyricsClient.search(queue.current.title)
    .then(x => {if(x==null){message.channel.send(`❌ | Unable to find any lyrics for ${queue.current.title}`)}else{message.channel.send(x.lyrics)}})
    .catch(console.error);
    }
}
//queue
function queue (message) {
    if(message !== undefined){
        const queue = player.getQueue(message.guild)
        if (queue !== undefined){
            let dnum = 10
            let num = 0
            let msg = ""
            let lenght = queue.tracks.length;
            Object.values(queue.tracks).forEach(track =>{
                num = num + 1
                msg = msg + `${num}: **${track}**\n`
                if (num === dnum){
                    dnum = dnum + 10
                    message.channel.send(msg)
                    msg = ""
                }
                if (num === lenght){
                    message.channel.send(msg)
                }
            })
        }
        else{
            message.channel.send("❌ | Nothing is playing");
        }
    }
}
//repeat
function repeat (message, arg) {
    if(message != undefined){
        const queue = player.getQueue(message.guild)
        if (arg != undefined) {
            if (queue == undefined){return message.channel.send("❌ | you need to play something")}
            if(arg == "current"){return message.channel.send(`Repeat is currently set to **${queue.repeatMode}**`)}
        queue.setRepeatMode(arg);
        message.channel.send(`✅ | repeat for this session is set to ${queue.repeatMode}`)
        }
    }
}
//jump
function jump (message, args) {
    if(message !== undefined){
        if(!check(message)) return;
        if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
        arg = args.shift()
        const queue = player.getQueue(message.guild)
        try {queue.jump(Number(arg)-1)}
        catch {message.reply(`Enter the valid number\nType: **${getServerData(message, "prefix")}q** to display queue`)}
    }
}
//back
function back (message) {
    if(message !== undefined){
        if(!check(message)) return;
        if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
        const queue = player.getQueue(message.guild)
        console.log(queue)
        try {queue.back()}
        catch{message.reply("❌ | There is no back")}
    }
}
//shuffle
function shuffle(message) {
    if(message !== undefined){
        if(!check(message)) return;
        if(player.getQueue(message.guild) == undefined){message.channel.send("❌ | Nothing is playing"); return}
        const queue = player.getQueue(message.guild)
        queue.shuffle()
        message.channel.send("Shuffled current q")
    }
}
//exports functions for commands
module.exports = {
    music : musicplay,
    skip : skip,
    clear : clear,
    leave : leave,
    lyrics : lyrics,
    pause : pause,
    queue : queue,
    repeat : repeat,
    check : check,
    jump : jump,
    back : back,
    shuffle : shuffle
}
console.log("Music-Logic: OK")