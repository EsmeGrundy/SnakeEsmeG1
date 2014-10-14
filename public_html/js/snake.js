/*--------------------------------------------------------------------------
 * Variables
 * -------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var ScreenHeight;
var ScreenWidth;

/*--------------------------------------------------------------------------
 * Calling Functions
 * -------------------------------------------------------------------------
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 3000 / 20);

/*-------------------------------------------------------------------------
 * Game Functions
 * ------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    ScreenWidth = window.innerWidth;
    ScreenHeight = window.innerHeight;

    canvas.width = ScreenWidth;
    canvas.height = ScreenHeight;

    document.addEventListener("keydown", keyboardHandler);
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(235, 150, 54)";
    context.fillRect(0, 0, ScreenWidth, ScreenHeight);
}

/*-------------------------------------------------------------------------
 * Snake Functions
 * ------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 10;
    snakeDirection = "down";

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if(snakeDirection === "down") {
        snakeHeadY++;
    }
    else if (snakedirection === "up"){
        snakeHeadY--;
    }
    else if (snakeDirection === "right"){
        snakeHeadX++;
    }
    else if (snakedirection === "left"){
        snakeHeadX--;
    }

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
    
 
    
}

/*--------------------------------------------------------------------------
 * Food Functions
 * -------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * ScreenWidth);
    var randomY = Math.floor(Math.random() * ScreenHeight);

    food.x = randomX;
    food.y = randomY;
}

function keyboardHandler(event) {
    console.log(event);
    
//    var key = event.keyCode;
//    
//    if (key === 37 && snakeDirection !== "right"){
//        snakeDirection === "left";
//    }
//    else if(key === 38 && snakeDirection !== "down") {
//        snakeDirection === "up";
//    }
//    else if(key === 39 && snakeDirection !== "left") {
//        snakeDirection === "right";
//    }
//    else if(key === 40 && snakeDirection !== "up") {
//        snakeDirection === "down";
//    }
}

