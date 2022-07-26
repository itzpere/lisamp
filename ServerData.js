const { Console } = require('console');
const fs = require('fs');
const defaultTemplate = require("./defaultTemplate.json")


function main (guild, wyn){
    let exist = false;
    let fileL = "";
    let temp = [];
    temp = check(guild);
    exist = temp[0];
    fileL = temp[1];
    let foundvalue;

    if (!exist) {
    addNewGuild(guild);
    console.log("new guild added: ", guild.id);
    temp = check(guild);
    exist = temp[0];
    fileL = temp[1];
    }
    if (wyn == "file") {return fileL;}
    foundvalue = findValue(wyn, fileL, guild);
    return foundvalue;
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
    //console.log(exist," ",fileL)
    return [exist, fileL];
}
function findValue (wyn, file, guild){
    console.log("findValue called")
    let jsonFile = require(file)
    delete require.cache[require.resolve(file)];
    jsonFile = require(file)
    if (!jsonFile[wyn])
    {
        let tempi
        console.log("jsonfile is not")
        for(var index in defaultTemplate) { 
            if (index == wyn){
                tempi = index
                break;
            }
        }
        jsonFile[tempi] = defaultTemplate[tempi]
        console.log(jsonFile);
        let stringDT = JSON.stringify(jsonFile);
        fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
    }
    try {return jsonFile[wyn]}
    catch {console.error(error)}
}
async function addNewGuild(guild){
    let stringDT = JSON.stringify(defaultTemplate);
    await fs.promises.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
    return;
}
module.exports = {
    getServerData : main
}

