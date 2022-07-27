const fs = require('fs');
const defaultTemplate = require("./guilds/defaultTemplate.json")

function main (message){
    let guild = message.guild;
    let exist = false;
    let fileL = "";
    let temp = [];
    temp = check(guild);
    exist = temp[0];
    fileL = temp[1];
    if (!exist) {
    addNewGuild(guild)
    console.log("new guild added: ", guild.id);
    message.channel.send("✅ | Server is now set up");
    return false;
    }else
    return fileL;
}
function setData (message, wyn, value){
    let file = main(message)
    if (!file) return;
    let guild = message.guild;
    let jsonFile = require(file);
    delete require.cache[require.resolve(file)];
    jsonFile = require(file);
    try {
        jsonFile[wyn] = value
        console.log(`Value ${value} is set for ${wyn}`);
        let stringDT = JSON.stringify(jsonFile);
        fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
        return;
    }
    catch {
        console.error(`Value you tried to edit does not exist: ${wyn}`);
        return;
    }
}
function check (guild) {
    const getFiles = require("./get-files.js")
    let files = getFiles("./guilds/", ".json")
    let exist = false;
    let fileL = "";
    for (const file of files) {
        const split = file.replace(/\\/g,'/').split('/');
        const fileName = split[split.length - 1].replace(".json",'')
        if (fileName == guild.id) {
            exist = true;
            fileL = file;
            break;
        };
    }
    return [exist, fileL];
}
function findValue (message, wyn){
    let file = main(message)
    if (!file) return;
    let guild = message.guild;
    if (wyn == undefined) {return}
    if (wyn == "file") {return file;}
    let jsonFile = require(file)
    delete require.cache[require.resolve(file)];
    jsonFile = require(file)
    if (!jsonFile[wyn])
    {
        let tempi
        for(var index in defaultTemplate) { 
            if (index == wyn){
                tempi = index
                break;
            }
        }
        jsonFile[tempi] = defaultTemplate[tempi]
        let stringDT = JSON.stringify(jsonFile);
        fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
    }
    try {return jsonFile[wyn]}
    catch {console.error(error);return;}
    
}
function addNewGuild(guild){
    let stringDT = JSON.stringify(defaultTemplate);
    fs.promises.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
}
module.exports = {
    getServerData : findValue,
    setServerData : setData
}

