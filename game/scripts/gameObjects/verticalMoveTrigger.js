import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class VerticalMoveTrigger extends BaseGameObject {
    name ="VerticalMoveTrigger"
    backGroundDiv = null;
    update = function () {
        //this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + 300 + "px";
        global.canvas.style.marginTop=  global.backgroundShiftY / 2  + "px";
    }

    draw = function () {
     //  global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            if (this == global.bottomMoveTrigger && global.playerObject.yVelocity <= 0)
                return;
            if (this == global.topMoveTrigger && global.playerObject.yVelocity >= 0)
                return;


            let shiftBy = collidingObject.yVelocity * global.deltaTime;
            global.backgroundShiftY += shiftBy * - 1;

            if (global.backgroundShiftY < global.backgroundMaxShiftY) {
                global.backgroundShiftY = global.backgroundMaxShiftY;
                //collidingObject.x = collidingObject.previousX;
            }
            else if (global.backgroundShiftY > 0) {
                global.backgroundShiftY = 0;
                //collidingObject.x = collidingObject.previousX;
            }
            else {
                global.bottomMoveTrigger.y += shiftBy;
                global.topMoveTrigger.y += shiftBy;
                global.leftMoveTrigger.y += shiftBy;
                global.rightMoveTrigger.y += shiftBy;
            }
        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export {VerticalMoveTrigger}