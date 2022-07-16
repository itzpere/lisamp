module.exports = {
    name: 'hello',
    description: "salje pozdrave",
    execute(message,args){
        message.channel.send('hello!');
    }
}