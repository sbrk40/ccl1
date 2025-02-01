import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    name ="MoveTrigger"
    backGroundDiv = null;
    update = function () {
        //this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + 300 + "px";
        global.canvas.style.marginLeft =  global.backgroundShift / 2  + "px";
    }

    draw = function () {
      // global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            if (this == global.rightMoveTrigger && global.playerObject.xVelocity <= 0)
                return;
            if (this == global.leftMoveTrigger && global.playerObject.xVelocity >= 0)
                return;


            let shiftBy = collidingObject.xVelocity * global.deltaTime;
            global.backgroundShift += shiftBy * -1;

            if (global.backgroundShift < global.backgroundMaxShift) {
                global.backgroundShift = global.backgroundMaxShift;
                //collidingObject.x = collidingObject.previousX;
            }
            else if (global.backgroundShift > 0) {
                global.backgroundShift = 0;
                //collidingObject.x = collidingObject.previousX;
            }
            else {
                global.leftMoveTrigger.x += shiftBy;
                global.rightMoveTrigger.x += shiftBy;
                global.topMoveTrigger.x += shiftBy;
                global.bottomMoveTrigger.x += shiftBy;
            }
        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export {MoveTrigger}