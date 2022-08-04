const fs = require('fs');
const defaultTemplate = require("./guilds/defaultTemplate.json") //default config
const debug = false;

//this calls to create new guildid.json if it doesnt exist
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
    }else return fileL;
}
//checks if value exist in default config and if it doesnt it adds it
function checkDefault(jsonFile, wyn,guild){
    consoleDebug("check default called")
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
}
//checks if file with this guildid exists and returns its location if it does
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
//this changes the value of data in json file
function setData (message, wyn, value){ 
    let file = main(message)
    if (!file) return;
    let guild = message.guild;
    let jsonFile;
    jsonFile = require(file)
    checkDefault(jsonFile, wyn, guild);
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
//this finds and returns value, if value doesnt exist in the file
function findValue (message, wyn){
    consoleDebug("find value called")
    let file = main(message)
    if (!file) return;
    let guild = message.guild;
    let array = [];
    let jsonFile = require(file)
    delete require.cache[require.resolve(file)];
    jsonFile = require(file)
    for (let index = 0; index < wyn.length; index++) {
        if (wyn == undefined) {return}
        if (wyn == "file") {return file;}
        consoleDebug(`check ${wyn[index]}`)
        checkDefault(jsonFile,wyn[index],guild);
        try{array[index] = jsonFile[wyn[index]]}
        catch {console.error(error);return;}
    }
    consoleDebug("returning array")
    try {
        if(array.length == 1){
            return array[0]
        }
        else
        return array}
    catch {console.error(error);return;}
    
}
//adds new config file for guild
function addNewGuild(guild){
    let stringDT = JSON.stringify(defaultTemplate);
    fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
}
function consoleDebug(message){
    if (debug){
        console.log(message)
    }
}
module.exports = {
    getServerData : findValue,
    setServerData : setData,
    restartToDefaultData : addNewGuild
}