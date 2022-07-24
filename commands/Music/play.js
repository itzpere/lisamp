const { music } = require('../../music-logic.js');
let can = true
module.exports = {
    callback: async (message, ...args) => {
        console.log("play: ",args);
        let song = "";
        while(args.length){
            song += args.shift() + " ";
        }
        await waitFor(_ => can === true);
        can = false;
        await music(message, song);
        can = true
    }
}

function waitFor(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
  
    return new Promise(poll);
  }