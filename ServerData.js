const fs = require('fs');
const defaultTemplate = require("./guilds/defaultTemplate.json") //default config
const dataBasetype = require("./config.json").dataBase
var database;
switch (dataBasetype.toLowerCase()){
    case "mongodb": 
        mongo()
        break;
    case "mysql":
        var mysql = require("mysql")
        console.log(`MySQL database loaded`)
        database = 1
        break;
    default: 
        mongo()
        break;
    }
function mongo()
{
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://pere:<password>@lisamp.cv6eo05.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
}
/*
func : get, set and restore - required for *
message: message the user sent - required for *
value: the value you want to get/set - required for get, set
des: desired value - required for set
*/
function serverData ( func, message, value, des){
    guild = message.guild
    switch (database){
        case 0://mongodb
            return mongodb(func, guild, value, des)
        case 1://mysql
            return mysql(func, guild, value, des)
    }
}
function mongodb(func, guild, value, des){
    if (func === "get"){

    } else
    if (func === "set"){
        
    } else
    if (func === "restore"){
        
    }
}
function mysql(func, guild, value, des){
    if (func === "get"){

    } else
    if (func === "set"){
        
    } else
    if (func === "restore"){
        
    }
}


module.exports = {
    serverData
}



































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
    //console.log("check default called")
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
    let jsonFile = require(file);
    delete require.cache[require.resolve(file)];
    jsonFile = require(file);
    checkDefault(jsonFile,wyn, guild);
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
    //console.log("find value called")
    let file = main(message)
    if (!file) return;
    let guild = message.guild;
    if (wyn == undefined) {return}
    if (wyn == "file") {return file;}
    //console.log("jsonfile read called")
    let jsonFile = require(file)
    delete require.cache[require.resolve(file)];
    jsonFile = require(file)
    //console.log("jsonfile read done")
    checkDefault(jsonFile,wyn,guild);
    try {return jsonFile[wyn]}
    catch {console.error(error);return;}
    
}
//adds new config file for guild
function addNewGuild(guild){
    let stringDT = JSON.stringify(defaultTemplate);
    fs.writeFile(`./guilds/${guild.id}.json`, stringDT, (err) => err && console.error(err))
}