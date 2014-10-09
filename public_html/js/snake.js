/*--------------------------------------------------------------------------
 * Variables
 * -------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;

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
setInterval(gameLoop, 1000/20);

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
    
    var direction = "right";
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
    snakeSize = 20;

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    snakeHeadX++;

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
    
    if(direction === "right")snakeHeadX++;
    else if(direction === "left")snakeHeadX--;
     else if(direction === "up")snakeHeadY++;
      else if(direction === "down")snakeHeadY--;
    

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

