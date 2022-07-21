module.exports = {
    callback: (message, ...args) => {
        console.log("info: ",args);
        message.reply("LisAmp is a private bot for **CrnaZemlja.**\n\n**Current features**: answer the questions, can play music (*sometimes*). \n\n*currently under development.*")
    }
}
