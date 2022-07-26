const fs = require('fs');
const { prefix } = require("./config.json");

console.log("pref called")
function addNewGuild(guild){


    const defaultTemplate = {
        "guildid" : guild.id,
        "prefix" : prefix,
        "repeat" : 0
    }
    let stringDT = JSON.stringify(defaultTemplate);
    fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
}
module.exports = {
    addNG : addNewGuild
}