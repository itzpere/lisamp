# lisamp
Private discord bot for CrnaZemlja


## List of features
- Music play
- interactions with bot
- support for server


Add to server : https://discord.com/api/oauth2/authorize?client_id=996836986948157460&permissions=8&scope=bot

## How to use
To use the bot you will need **nodeJS 18.6.0** and you need libtools which you can get by running the following command <br>`sudo apt-get install libtool autoconf automake`<br> then you can clone the git repo and run <br> `npm instal` <br> which will install all dependencies and i personally use **pm2** for hosting the bot. You can install it with <br>`npm i pm2 -g`<br> (-g stands for global so if you want it to be only internal package you can remove it) and run it with <br>`pm2 start index.js`<br>.
But before you run the bot you will need to create a **config.json** file in main repo which will indule the following code:
```
{
   "token"   : "YourToken",
   "clientId": "YourClientID",
   "guildId" : "YourGuildId",
	"prefix"  : "!",
   "suffix"  : ".js"
}
```

## Version
0.1.0 *In development*