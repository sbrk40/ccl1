import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";



class Heart extends BaseGameObject {
    name = "Heart";
    xVelocity = 0;
    yVelocity = 0;  
    collision = true;
    width = 130;
    height = 100;
   

        animationData = {
            "animationSprites": [], 
            "timePerSprite": 0.3,
            "currentSpriteElapsedTime": 0,
            "firstSpriteIndex": 0,
            "lastSpriteIndex": 1,
            "currentSpriteIndex": 0
        };

        getBoxBounds = function () {
            let bounds = {
                left: this.x + 40,
                right: this.x + this.width - 40,
                top: this.y + 40,
                bottom: this.y + this.height - 40
            }
            return bounds;
        };
    
        draw = function () {
            let sprite = this.getNextSprite();
            global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        };
    
        update = function () { // Updates the game's state on every frame
           
            this.x += this.xVelocity * global.deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
            this.y += this.yVelocity * global.deltaTime;
            
        }
    


        reactToCollision = function(collidingObject) {
            switch (collidingObject.name) {
                case "Player":
                    console.log(global.playerObject.playerHealth);

                    if(global.playerObject.playerHealth == 3) {
                        this.collision = false;
                    }
                    else if(global.playerObject.playerHealth < 3 && global.playerObject.playerHealth > 0) { 
                        this.active = false;
                        global.playerObject.playerHealth = global.playerObject.playerHealth + 1;
                        global.heartDisplay.src = "./images/heart" + global.playerObject.playerHealth  + ".png";
                    }
                    break;
            }
        }
    
        constructor(x, y, width, height) {
            super(x, y, width, height);
            //this.loadImages(["./images/PacMan0.png", "./images/PacMan1.png", "./images/PacMan2.png"]);
            this.loadImagesFromSpritesheet("./images/sprite_heart.png", 2, 1);
        }
   
}

export { Heart }