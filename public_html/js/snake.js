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
var restartButton;
var playHUD;
var scoreboard;
var startMenu;
var lvl1Button;
var lvl2Button;
var lvl3Button;
var imageFood;
var imageSnake;
var interval;
/*--------------------------------------------------------------------------
 * Calling Functions
 * -------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
gameDraw();

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

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    playHUD = document.getElementById("playHUD");

    scoreboard = document.getElementById("scoreboard");

    startMenu = document.getElementById("startMenu");
    centerMenuPosition(startMenu);

    lvl1Button = document.getElementById("lvl1Button");
    lvl1Button.addEventListener("click", gameStartLevel1);

    lvl2Button = document.getElementById("lvl2Button");
    lvl2Button.addEventListener("click", gameStartLevel2);

    lvl3Button = document.getElementById("lvl3Button");
    lvl3Button.addEventListener("click", gameStartLevel3);

    setState("START");
    
    imageFood = new Image();
    imageFood.src = "http://cdn.orkin.com/images/rodents/deer-mouse-illustration_2388x1617.jpg";
    
    imageSnake = new Image();
    imageSnake.src = "images/Scales.jpg";
}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
        drawScoreboard();
    }
}

function startInterval(){
    clearInterval(interval);
    interval = setInterval(gameLoop, 2000/20);
}

function gameDraw() {
    context.fillStyle = "rgb(235, 150, 54)";
    context.fillRect(0, 0, ScreenWidth, ScreenHeight);
    context.lineWidth = 2;
    context.strokeStyle = "black";
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("START");
}

function gameStartLevel1() {
    snakeInitialize();
    foodInitialize();
    setInterval(gameLoop, 2000 / 20);
    hideMenu(startMenu);
    setState("PLAY");
}

function gameStartLevel2() {
    snakeInitialize();
    foodInitialize();
    setInterval(gameLoop, 1500 / 20);
    hideMenu(startMenu);
    setState("PLAY");
}

function gameStartLevel3() {
    snakeInitialize();
    foodInitialize();
    setInterval(gameLoop, 1000 / 20);
    hideMenu(startMenu);
    setState("PLAY");
}
/*-------------------------------------------------------------------------
 * Snake Functions
 * ------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 30;
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
//        context.fillStyle = "black";
//        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
       context.drawImage(imageSnake,snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "rgb(235, 150, 54)";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection === "down") {
        snakeHeadY++;
    }
    else if (snakeDirection === "up") {
        snakeHeadY--;
    }
    else if (snakeDirection === "right") {
        snakeHeadX++;
    }
    else if (snakeDirection === "left") {
        snakeHeadX--;
    }

    checkFoodCollision(snakeHeadX, snakeHeadY);
    checkWallCollision(snakeHeadX, snakeHeadY);
    checkSnakeCollision(snakeHeadX, snakeHeadY);

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
//    context.fillStyle = "black";
//    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
      context.drawImage(imageFood,food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);

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

    if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    else if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }

}

/*------------------------------------------------------------------------------
 * Collision Handlers
 * -----------------------------------------------------------------------------
 */

function checkFoodCollision(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        })
        snakeLength++;
        setFoodPosition();
    }
}


function checkWallCollision(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize > ScreenWidth || snakeHeadX * snakeSize < 0 || snakeHeadY * snakeSize >= ScreenHeight || snakeHeadY * snakeSize < 0) {
        setState("GAME OVER");
        clearInterval();

    }
}

function checkSnakeCollision(snakeHeadX, snakeHeadY) {
    for (var index = 1; index < snake.length; index++) {
        if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
            setState("GAME OVER");
            clearInterval();
        }
    }
}

/*------------------------------------------------------------------------------
 * Game State Handling
 * -----------------------------------------------------------------------------
 */

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

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
    else if (state == "PLAY") {
        displayMenu(playHUD);
    }
    else if (state == "START") {
        displayMenu(startMenu);
        
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (ScreenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (ScreenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard() {
    scoreboard.innerHTML = "Score: " + (snakeLength - 5);
}