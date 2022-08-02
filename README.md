# LisAmp
<img src="https://user-images.githubusercontent.com/107474038/182022984-5cb5d7ee-69ef-4ec6-ab91-33d636399475.png" alt="drawing" width="100%"/>
Music bot you can host on your own<br>
Add to server : https://discord.com/api/oauth2/authorize?client_id=996836986948157460&permissions=8&scope=bot

## List of features
- Music play 24/7
- Interactive messages
- support for servers

## Planned features
- browser extention that will be able to detect song you are playing on your browser and play it on discord bot

## How to use
To use the bot you will need **nodeJS 16.6.0 or higher** and then after cloning the repository you run <br> `npm install` <br> which will install all dependencies and i personally use **pm2** for hosting the bot. You can install it with <br>`npm i pm2 -g` (-g stands for global so if you want it to be only internal package you can remove it) <br> Start the bot with <br>`pm2 start index.js`<br>
But before you run the bot you will need to create a `config.json` file in main repo which will indule the following code:
```json
{
   "token"   : "YourBotToken"
}
```
And lastly when you want to update the bot to the newer version you can run <br> `git reset --hard HEAD` <br>`git pull`<br> and you wont need to do the setup process again, just run `npm install` and you are good to go.
If you want a deaper explenation you can take a look at [wiki](https://github.com/itzpere/lisamp/wiki)
