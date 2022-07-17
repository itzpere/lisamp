module.exports = {
    callback: (message, ...args) => {
        console.log("ping: ",args);
        message.reply('pong!');
    },
}
