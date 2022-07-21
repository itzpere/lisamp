module.exports = {
    callback: (message, ...args) => {
        console.log("info: ",args);
        message.reply("This is a private bot for **CrnaZemlja**\n*currently under development.*")
    }
}
