var snake;
var snakeLength;
var snakeSize;

var context;
var ScreenHeight;
var ScreenWidth;

gameInitialize();
gameDraw();

function gameInitialize(){
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    ScreenWidth = window.innerWidth;
    ScreenHeight = window.innerHeight;
    
    canvas.width = ScreenWidth;
    canvas.height = ScreenHeight;
}

function gameLoop(){
    
}

function gameDraw(){
    context.fillStyle = "rgb(235, 150, 54)";
    context.fillRect(0, 0, ScreenWidth, ScreenHeight);
}

function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    
    for(var index = 0; index < snakeLength; index++){
        
    }
}

function snakeDraw(){
    
}

function snakeUpdate(){
    
}


