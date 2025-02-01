import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";



class Brother extends BaseGameObject {
    name = "Brother";
    xVelocity = 0;
    yVelocity = 0;  
    collision = false; 
    width = 110;
    height = 90;
   

        animationData = {
            "animationSprites": [], 
            "timePerSprite": 0.5,
            "currentSpriteElapsedTime": 0,
            "firstSpriteIndex": 0,
            "lastSpriteIndex": 1,
            "currentSpriteIndex": 0
        };
    
        getBoxBounds = function () {
            let bounds = {
                left: this.x + 50,
                right: this.x + this.width - 50,
                top: this.y + 50,
                bottom: this.y + this.height
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
                    
                    break;
            }
        }
    
        constructor(x, y, width, height) {
            super(x, y, width, height);
            //this.loadImages(["./images/PacMan0.png", "./images/PacMan1.png", "./images/PacMan2.png"]);
            this.loadImagesFromSpritesheet("./images/spritesheet_brother.png", 2, 1);
        }
   
}

export { Brother }