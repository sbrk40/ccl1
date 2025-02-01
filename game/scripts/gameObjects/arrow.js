import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";



class Arrow extends BaseGameObject {
    name = "Arrow";
    xVelocity = 0;
    yVelocity = 0;  
    arrowVelocity = 400;
    width = 230;
    height = 200;
   

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };
        
    update = function () { // Updates the game's state on every frame
        this.x += this.xVelocity * global.deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
        this.y += this.yVelocity * global.deltaTime;
        
    }


    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Enemy":
                this.active = false
                break;
            case "Wall":
                this.arrowVelocity = 0;
                break;
        }
    }
    
        constructor(x, y, width, height, facing) {
            super(x, y, width, height);
            if(global.playerObject.facing == 1) {
                this.xVelocity = this.arrowVelocity;
                this.yVelocity = 0;
                this.loadImages(["./images/arrow_right.png"]);
        }
            if(global.playerObject.facing == 2) {
                this.xVelocity = -this.arrowVelocity;
                this.yVelocity = 0;
                this.loadImages(["./images/arrow_left.png"]);
        }
            if(global.playerObject.facing == 3) {
                this.xVelocity = 0;
                this.yVelocity = -this.arrowVelocity;
                this.loadImages(["./images/arrow_up.png"]);
        }
        if(global.playerObject.facing == 4) {
            this.xVelocity = 0;
            this.yVelocity = this.arrowVelocity;
            this.loadImages(["./images/arrow_down.png"]);
    }
        }
    
}

export { Arrow }