
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = "red";
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw(){

    const ballColorArray = ["red","green","blue","#0095DD"];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius) {
        dy = -dy;
        ballColor = ballColorArray[Math.floor(Math.random()*4)];
    }else if(y +dy > canvas.height-ballRadius){
        //このif文意味不明
        if(x > paddleX && x < paddleX + paddleWidth) {
            //なんやこれ
            dy = -dy ;
        } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        }
    }

    
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        ballColor = ballColorArray[Math.floor(Math.random()*4)];
    } 
    


    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3; 
    } else if (leftPressed && paddleX >0) {
        paddleX -= 3;
    } 
    x += dx;
    y += dy;
}

var interval = setInterval(draw,10);




