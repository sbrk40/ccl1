import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Arrow } from "./arrow.js";



class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;  
    facing = -1;
    hasBow = false;
    lastShotTimer = 0.5;
    playerHealth = 3;
   
    animationData = {
        "animationSprites": [], 
        "timePerSprite": 0.12,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 7,
        "currentSpriteIndex": 0
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 70,
            right: this.x + this.width - 70,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };
    
        update = function () { // Updates the game's state on every frame
            if(global.keys["d"] == true) {
                global.playerObject.xVelocity = 250;
                global.playerObject.yVelocity = 0;
                if(global.playerObject.facing != 1) {
                    global.playerObject.switchCurrentSprites(16, 19);
                }
                global.playerObject.facing = 1; //facing right
                
            }

            else if(global.keys["a"] == true) {
                global.playerObject.xVelocity = -250;
                global.playerObject.yVelocity = 0;
                if(global.playerObject.facing != 2) {
                    global.playerObject.switchCurrentSprites(12, 15);
                }
                global.playerObject.facing = 2; //facing left
            }
            
            else if(global.keys["w"] == true) {
                global.playerObject.xVelocity = 0;
                global.playerObject.yVelocity = -250;
                if(global.playerObject.facing != 3) {
                    global.playerObject.switchCurrentSprites(20, 23);
                }
                global.playerObject.facing = 3; //facing up
                
            }
            

            else if(global.keys["s"] == true) {
                global.playerObject.xVelocity = 0;
                global.playerObject.yVelocity = 250;
                if(global.playerObject.facing != 4) {
                    global.playerObject.switchCurrentSprites(8, 11);
                }
                global.playerObject.facing = 4; //facing down
            }

            else if(global.keys["e"] == true) {
                this.shootArrow();

            }
            else {
                global.playerObject.xVelocity = 0;
                global.playerObject.yVelocity = 0;
                global.playerObject.switchCurrentSprites(global.playerObject.animationData.firstSpriteIndex,global.playerObject.animationData.firstSpriteIndex );
            }
            
           
            this.x += this.xVelocity * global.deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
            this.y += this.yVelocity * global.deltaTime;
            this.lastShotTimer += global.deltaTime;

        }

        
    
       reactToCollision = function(collidingObject) {
        
            switch (collidingObject.name) {
                case "Wall":
                    this.xVelocity = 0;
                    this.yVelocity = 0;
                    this.x = this.previousX;
                    this.y = this.previousY;
                    break;
                
                case "Enemy":
                    if (global.hitByEnemyInTheLast5Seconds === false) {
                        this.playerHealth = this.playerHealth -1;
                        global.heartDisplay.src = "./images/heart" + this.playerHealth  + ".png";
                        global.hitByEnemyInTheLast5Seconds = true;
                        setTimeout(() => {global.hitByEnemyInTheLast5Seconds = false;},
                        3000);
                    }
                  if(this.playerHealth <= 0) {
                        this.xVelocity = 0;
                        this.yVelocity = 0;
                        this.x = this.previousX;
                        this.y = this.previousY;
                    }//console.log("playerHealth");
                    break;
                    case "Brother":
                        document.querySelector('#winScreen').style.display = 'block'; 
                        document.querySelector('#canvas').style.display = 'none'; 
                        
                        this.xVelocity = 0;
                        this.yVelocity = 0;
                        this.x = this.previousX;
                        this.y = this.previousY;
                    break;
                    case"Heart":
                    if(global.playerHealth == 3) {
                        this.heart.collision = false;
                    }
                    else if(global.playerHealth < 3 && global.playerHealth > 0) { 
                        this.heart.active = false;
                        global.playerHealth = global.playerHealth + 1;
                    }
                    break;
            }
        }
        
        
        

         shootArrow = function() {
            //console.log("shoot");
           if(this.hasBow == true && this.lastShotTimer >= 1.0) { 
                if(this.facing == 1) {
                    new Arrow(global.playerObject.x, global.playerObject.y + 10, 10, 10, 20, 0);
                    console.log("shoot right");
                }
                if(this.facing == 2) {
                    new Arrow(global.playerObject.x, global.playerObject.y + 10, 10, 10, -20, 0);
                    console.log("shoot left");
                }
                if(this.facing == 3) {
                    new Arrow(global.playerObject.x, global.playerObject.y + 10, 10, 30, 0, -20);
                    console.log("shoot up");
                }
                if(this.facing == 4) {
                    new Arrow(global.playerObject.x, global.playerObject.y + 50, 10, 10, 0, 20);
                    console.log("shoot down");
                }

                this.lastShotTimer = 0;
            }
    }

        constructor(x, y, width, height) {
            super(x, y, width, height);
            
            this.loadImagesFromSpritesheet("./images/spritesheet_player.png", 4, 6);
            this.playerHealth = 3;
        }
   
}

export { Player }