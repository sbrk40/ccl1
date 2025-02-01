import { global } from "./global.js";



function move(event) {

    global.keys[event.key] = true;
 /*   switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            
            break;
        case "a":
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            
            break;
        case "w":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -200;
            
            break;
        case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 200;
            
            break;
    }*/
}




function stop(event) {
    global.keys[event.key] = false;
    //if you just want to move as long as the player presses a key
   /* global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;*/
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);