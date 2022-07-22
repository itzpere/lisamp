# lisamp
Private discord bot for CrnaZemlja


## List of features
- Music play
- interactions with bot
- support for server


Add to server : https://discord.com/api/oauth2/authorize?client_id=996836986948157460&permissions=8&scope=bot

## How to use
To use the bot you will need **nodeJS 18.5.0** then you can clone the git repo and run `npm instal` which will install all dependencies and i personally use **pm2** for hosting the bot. You can install it with `npm install pm2` and run it with `pm2 start index.js`.
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
0.1.0
*In development*