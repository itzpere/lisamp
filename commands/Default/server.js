module.exports = {
    callback: (message, ...args) => {
        console.log("Server name: ",args);
        message.reply(`**Server name**: ${message.guild.name}\n**Total members**: ${message.guild.memberCount}\n**Created at**: ${message.guild.createdAt}\n`);
    },
}