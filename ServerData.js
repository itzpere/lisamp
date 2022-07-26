const fs = require('fs');
const { prefix } = require("./config.json");
const getFiles = require("./get-files.js")


function check (guild, wyn){
    let files = getFiles("./guilds/", ".json")
    let exist = false;
    let fileL = "";
    console.log(files)
    for (const file of files) {
        const split = file.replace(/\\/g,'/').split('/');
        const fileName = split[split.length - 1].replace(".json",'')
        if (fileName == guild.id) {
            exist = true;
            fileL = file;
            break;
        };
    }
    console.log(exist," ",fileL)
    if (!exist) {addNewGuild(guild)}
    return findValue(wyn, fileL)
}
function findValue (wyn, file){
    console.log("findValue called")
    const jsonFile = require(file)
    return jsonFile[wyn]
}
function addNewGuild(guild){
    
    //dafault values
    const defaultTemplate = {
        "guildid" : guild.id,
        "prefix" : prefix,
        "repeat" : 0
    }
    let stringDT = JSON.stringify(defaultTemplate);
    fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
    console.log("new guild added: ", guild.id)
}
module.exports = {
    getServerData : check
}