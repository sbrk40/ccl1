import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";



class Enemy extends BaseGameObject {
    name = "Enemy";
    xVelocity = 0;
    yVelocity = -200;

    width = 230;
    height = 200;
    enemyHealth = 3;


    randomMovementData = {
        "timeToChangeDirection": 4,
        "currentDirectionElapsedTime": 0,
        "movementChangePossibilityStartValue": 0.1,
        "movementChangePossibility": 0.1,
        "movementChangePossibilitySteps": 0.02,
        "movementChangeOppositePossibility": 0.3
    };

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 21,
        "currentSpriteIndex": 0
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 70,
            right: this.x + this.width - 70,
            top: this.y + 50,
            bottom: this.y + this.height - 30
        }
        return bounds;
    };

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    update = function () { // Updates the game's state on every frame
        if (this.xVelocity > 0 && this.animationData.firstSpriteIndex !== 11 && this.animationData.lastSpriteIndex !== 21) {
            this.switchCurrentSprites(11, 21);
        }
        else if (this.xVelocity < 0 && this.animationData.firstSpriteIndex !== 0 && this.animationData.lastSpriteIndex !== 10) {
            this.switchCurrentSprites(0, 10);
        }
        this.randomMovementData.currentDirectionElapsedTime += global.deltaTime;

        if (this.randomMovementData.currentDirectionElapsedTime >= this.randomMovementData.timeToChangeDirection) {
            this.randomizeMovement();
            this.randomMovementData.currentDirectionElapsedTime = 0;
        }




        this.x += this.xVelocity * global.deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
        this.y += this.yVelocity * global.deltaTime;

    }

    randomizeMovement() {
        const shouldChange = Math.random();
        if (shouldChange > this.randomMovementData.movementChangePossibility) {
            this.changeMovement();
            this.randomMovementData.movementChangePossibility = this.randomMovementData.movementChangePossibilityStartValue;
        } else {
            this.randomMovementData.movementChangePossibility += this.randomMovementData.movementChangePossibilitySteps;
        }
    }

    changeMovement() {
        const shouldGoOpposite = Math.random();
        if (shouldGoOpposite < this.randomMovementData.movementChangeOppositePossibility) {
            this.xVelocity *= -1;
            this.yVelocity *= -1;
        } else {
            const makePositive = Math.random();
            if (this.xVelocity !== 0) {
                this.yVelocity = 200 * (makePositive > 0.5 ? 1 : -1);
                this.xVelocity = 0;
            } else if (this.yVelocity !== 0) {
                this.xVelocity = 200 * (makePositive > 0.5 ? 1 : -1);
                this.yVelocity = 0;
            }
        }
    }



    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "Arrow":
                this.enemyHealth = this.enemyHealth - 1;
                if (this.enemyHealth == 0) {
                    this.active = false;
                }
                break;

            case "Wall":

                this.x = this.previousX;
                this.y = this.previousY;
                this.x = this.previousX - 0.01 * this.xVelocity;
                this.y = this.previousY - 0.01 * this.yVelocity;
                const originalProbability = this.randomMovementData.movementChangeOppositePossibility;
                this.randomMovementData.movementChangeOppositePossibility = 0;
                this.changeMovement();
                this.randomMovementData.movementChangeOppositePossibility = originalProbability;
                break;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/enemy_sprite.png", 11, 2);
    }

}

export { Enemy }