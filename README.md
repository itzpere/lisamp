# LisAmp
<img src="https://user-images.githubusercontent.com/107474038/182022984-5cb5d7ee-69ef-4ec6-ab91-33d636399475.png" alt="drawing" width="100%"/>
Music bot you can host on your own<br>
Add to server : https://shorturl.at/hsxZ0

## List of features
- Music play 24/7
- Free to use
- Host your own bot
- Interactive messages
- support for servers

## Planned features
- browser extention that will be able to detect song you are playing on your browser and play it on discord bot
## Commands

| **_Commands_** |      **_Description_**     |      **_Usage_**     |
|:--------------:|:--------------------------:|:--------------------:|
|      help      |    Display every command   | !help [command name] |
|      info      |   Display info about bot   |         !info        |
|      ping      |      Replies with pong     |         !ping        |
|     prefix     |    Set prefix for server   |  !prefix [newPrefix] |
|     server     |      See server status     |        !server       |
|      play      |     Play song/playlist     |    !p/!play [song]   |
|      skip      |      Skip current song     |       !s/!skip       |
|     Shuffle    |        Shuffle the q       |       !shuffle       |
|      queue     |     Show current queue     |       !q/!queue      |
|     lyrics     |    Find lyrics for song    |        !lyrics       |
|      jump      |     Jump to track in q     | !jump [track number] |
|      back      |  Go back to previous song  |         !back        |
|      clear     |        Clears the q        |        !clear        |
|       set      | Set role for playing music |      !set [role]     |
|      leave     |      leaves the voice      |        !leave        |
|     skipall    |       skips all songs      |       !skipall       |
|      stop      | Stops and leaves the voice |         !stop        |
| Restart config |  Restart config to default |    !restartconfig    |

## How to use
To use the bot you will need **nodeJS 16.6.0 or higher** and then after cloning the repository you run <br> `npm install` <br> which will install all dependencies and i personally use **pm2** for hosting the bot. You can install it with <br>`npm i pm2 -g` (-g stands for global so if you want it to be only internal package you can remove it) <br> Start the bot with <br>`pm2 start index.js`<br>
But before you run the bot you will need to run **setup.sh script** by typing in console <br> `./setup.sh` <br>
In here you only need to give the script your bot token (other stuff are optional). Script will create config.json file that will contain something like this: 
```json
{ "token" : "YourToken","prefix" : "!","musicrole" : "","repeat" : "0","ytcookie" : "","spcookie" : ""}
```
### Update to new version
When you want to update the bot to the newer version you can run <br> `git reset --hard HEAD` <br>`git pull`<br> and you wont need to do the setup process again, just run <br>`npm install`<br> and you are good to go. <br>
If you want a deaper explanation you can take a look at [wiki](https://github.com/itzpere/lisamp/wiki).
## Version
0.2.7

