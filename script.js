'use strict';
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var combo = 0;
var bricks = [];
var previousCollisionTime = new Date();
var ball = new Ball(canvas.width/2, canvas.height-30)

for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount;r++){
        bricks[c][r] = { x:0,y:0,status:1};
    }
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status === 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            //この部分意味不明
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener('mousemove',mouseMoveHandler,false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

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

function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if(b.status === 1){
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y <  b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    ball.changeColor()
                    b.status = 0;
                    score ++;
                    updateCombo()
                    if(score == brickRowCount*brickColumnCount){
                        alert("YOU WIN,CONGURATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//タイマー追加、コンボ数を0になるように
function updateCombo() {
    const collisionTime = new Date();
    const diffCollisionTime = collisionTime.getTime() - previousCollisionTime.getTime();
    previousCollisionTime = collisionTime;
    if(diffCollisionTime/1000 < 1) {
        combo ++
    } else {
        combo = 1
    }
}

function drawCombo() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("combo:" + combo, 8, 20);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" + score,100,20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
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
    collisionDetection();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawCombo();

    if (ball.y + ball.dy < ballRadius) {
        ball.dy = -ball.dy;
        ball.changeColor ();
    }else if(ball.y + ball.dy > canvas.height-ballRadius){
        //このif文意味不明
        if(ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            //なんやこれ
            ball.dy = -ball.dy ;
            //ブロックを返すにつれボールの速度をはやく(最速1ms)
            //speed -= 1;
        } else {
            //最終的に
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    
    if (ball.x + ball.dx < ballRadius || ball.x + ball.dx > canvas.width-ballRadius) {
        ball.dx = -ball.dx;
        ball.changeColor ();
    }    

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3; 
    } else if (leftPressed && paddleX >0) {
        paddleX -= 3;
    } 
    ball.move()
}

var interval = setInterval(draw, 1000 / 60);
