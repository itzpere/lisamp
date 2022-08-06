
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

fs.appendFile("./ServerData.db",'',(err) => {
if (err) return console.error(err.message)})

//connect to db
const db = new sqlite3.Database('./ServerData.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
    else return console.log("Database: OK")
})
createNewTable()
//createNewTable()
function createNewTable(){
db.run('create table IF NOT EXISTS config(id,prefix,repeat,musicrole)');
}
//update value  SetServerData
function setValue(message, value, newvalue, callback){
    const guildid = message.guild.id
    const sql = `update config set ${value} = ? where id = ?`
    const query = 'select * from config where id = ?' 
    db.all(query, [guildid], (err,rows) =>{
        if (err) return console.error(err.message)
        else if (rows.length > 1) { //if more than one then delete everyone and make new one
            db.run('delete from config where id = ?',[guildid], (err) =>{
                if (err) return console.error(err.message)
                else insertDefault(guildid, () => {
                    db.run(sql,[newvalue,guildid], (err) =>{
                        if (err) return console.error(err.message)
                        else if (typeof callback === 'function') callback()
                    })
                })
            })
        }else if (rows.length == 0){
            insertDefault(guildid, () => {
                db.run(sql,[newvalue,guildid], (err) =>{
                    if (err) return console.error(err.message)
                    else if (typeof callback === 'function') callback()
                })
            })
        }
        else
        db.run(sql,[newvalue,guildid], (err) =>{
            if (err) return console.error(err.message)
            else if (typeof callback === 'function') callback()
        })
    })
}
//get value
function getValue(message, valueNeeded, callback){
    let guildid = message.guild.id
    const query = 'select * from config where id = ?' 
    db.all(query, [guildid], (err,rows) =>{
        if (err) return console.error(err.message)
        else if (rows.length > 1) { //if more than one then delete everyone and make new one
            db.run('delete from config where id = ?',[guildid], (err) =>{
                if (err) return console.error(err.message)
                else insertDefault(guildid, () => {
                    return message.channel.send("✅ | Server is now set up");
                })
            })
        }else if (rows.length == 0){
            insertDefault(guildid, () => {
                return message.channel.send("✅ | Server is now set up");
            })
        }
        else
        if (typeof callback === 'function')
        {
        return callback(rows[0][valueNeeded])
        }
        else{
            return rows[0][valueNeeded]
        }
    })
}
//insert deafult
function insertDefault(guildid, callback){
    db.run('insert into config (id,prefix,repeat,musicrole) values (?,?,?,?)',[guildid,"!",0,""],(err) =>{
        if (err) return console.error(err.message);
        else if (typeof callback === 'function') callback()
    })
}

module.exports = {
    getServerData : getValue,
    setServerData : setValue,
    //restartToDefaultData : addNewGuild
}