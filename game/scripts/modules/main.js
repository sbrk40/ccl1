import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Brother } from "../gameObjects/brother.js";
import { Wall } from "../gameObjects/wall.js";
import { Bow } from "../gameObjects/bow.js";
import { Arrow } from "../gameObjects/arrow.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { VerticalMoveTrigger } from "../gameObjects/verticalMoveTrigger.js";
import { Heart } from "../gameObjects/heart.js";


const startScreen = document.getElementById('startscreen');
const startButton = document.getElementById('startButton');
const healthDisplay = document.getElementById('healthDisplay');


startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';

});


const endScreen = document.getElementById('endScreen');
const restartButton = document.getElementById('restartButton');


restartButton.addEventListener('click', () => {
   location.reload();
});

const winScreen = document.getElementById('winScreen');




function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {

            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }

    if (global.playerObject.playerHealth <= 0) {
        endScreen.style.display = "block";
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {

    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 


    global.playerObject = new Player(140, 300, 200, 150);
    global.brotherObject = new Brother(300, 2700, 40, 40)
    new Wall(100, 100, 100, 100)
    new Bow(1250, 1250, 100, 100);
    new Heart(750, 1250, 100, 100);
    new Heart(2440, 4600, 100, 100);
    new Heart(4100, 4600, 100, 100);
    new Heart(760, 4100, 100, 100);
    new Heart(1950, 300, 100, 100);
    new Heart(3630, 1250, 100, 100);
    new Heart(3630, 2200, 100, 100);
    global.rightMoveTrigger = new MoveTrigger(980, 0, 10, 2000);
    global.leftMoveTrigger = new MoveTrigger(700, 0, 10, 2000);
    global.topMoveTrigger = new VerticalMoveTrigger(0, 700, 2000, 10);
    global.bottomMoveTrigger = new VerticalMoveTrigger(0, 980, 2000, 10);

    //new Arrow(2400, 4500, 100, 100);


    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let i = 0; i < map.length; i++) {
        let innerArray = map[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new Wall(j * 238, i * 238, 238, 238);
            }
            else if (innerArray[j] == 0) {
                if ((Math.floor(Math.random() * 113) + 1) % 13 == 0) {
                    new Enemy(j * 238, i * 238, 50, 50);
                   
                }

            }
        }
    }


}




setupGame();
requestAnimationFrame(gameLoop);



