module.exports = {
    callback: (message, ...args) => {
        console.log("info: ",args);
        message.reply("LisAmp is a private bot for **CrnaZemlja.**\n**Current features**: answer the questions, can play music (*sometimes*).\nFollow on github: https://github.com/itzpere/lisamp \n\n*currently under development.*")
    }
}
