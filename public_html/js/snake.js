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

var gameState;
var gameOverMenu;

/*--------------------------------------------------------------------------
 * Calling Functions
 * -------------------------------------------------------------------------
 */

    gameInitialize();
    snakeInitialize();
    foodInitialize();
    setInterval(gameLoop, 1000 / 20);

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
    
    gameOverMenu = document.getElementById("game-over");
    centerMenuPosition(gameOverMenu);
    
    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(235, 150, 54)";
    context.fillRect(0, 0, ScreenWidth, ScreenHeight);
    context.lineWidth = 2;
    context.strokeStyle = "black";
}

/*-------------------------------------------------------------------------
 * Snake Functions
 * ------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
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
        context.strokeStyle = "rgb(235, 150, 54)";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if(snakeDirection == "down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "up"){
        snakeHeadY--;
    }
    else if (snakeDirection == "right"){
        snakeHeadX++;
    }
    else if (snakeDirection == "left"){
        snakeHeadX--;
    }
    
    checkFoodCollision (snakeHeadX, snakeHeadY);
    checkWallCollision(snakeHeadX, snakeHeadY);

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
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * ScreenWidth);
    var randomY = Math.floor(Math.random() * ScreenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

/*------------------------------------------------------------------------------
 * Input Functions
 * -----------------------------------------------------------------------------
 */

function keyboardHandler(event) {
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if(event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    else if(event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if(event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }

}

/*------------------------------------------------------------------------------
 * Collision Handlers
 * -----------------------------------------------------------------------------
 */

function checkFoodCollision (snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y){
        snake.push({
            x: 0,
            y: 0
        })
        snakeLength++;
        setFoodPosition();
    }
}

/*------------------------------------------------------------------------------
 * Game State Handling
 * -----------------------------------------------------------------------------
 */
function checkWallCollision (snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= ScreenWidth || snakeHeadX * snakeSize < 0 || snakeHeadY * snakeSize >= ScreenHeight || snakeHeadY * snakeSize< 0){
       setState("GAME OVER");
       
    }
}

function setState(state) {
    gameState = state;
    showMenu(state);
}

/*------------------------------------------------------------------------------
 * Menu Functions
 * -----------------------------------------------------------------------------
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function showMenu(state) {
    if (state == "GAME OVER"){
        displayMenu(gameOverMenu);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (ScreenHeight / 2) - (menu.offsetHeight / 2)+ "px";
    menu.style.left = (ScreenWidth / 2) - (menu.offsetWidth / 2) + "px";
}