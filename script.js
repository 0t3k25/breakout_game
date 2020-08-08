
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
var ballSpeed = 10;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount;r++){
        bricks[c][r] = { x:0,y:0,status:1};
    }
}

function ballColorChange (){
    const ballColorArray = ["red","green","blue","#0095DD"];
    ballColor = ballColorArray[Math.floor(Math.random()*4)];
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
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status === 1){
            if(x > b.x && x < b.x + brickWidth && y > b.y && y <  b.y + brickHeight) {
                dy = -dy;
                ballColorChange()
                b.status = 0;
                
                }
            }
        }
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
    collisionDetection();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius) {
        dy = -dy;
        ballColorChange ();
    }else if(y +dy > canvas.height-ballRadius){
        //このif文意味不明
        if(x > paddleX && x < paddleX + paddleWidth) {
            //なんやこれ
            dy = -dy ;
            //ブロックを返すにつれボールの速度をはやく(最速1ms)
            speed -= 1;
        } else {
            //最終的に
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        }
    }

    
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        ballColorChange ();
    } 
    


    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3; 
    } else if (leftPressed && paddleX >0) {
        paddleX -= 3;
    } 
    x += dx;
    y += dy;
}

var interval = setInterval(draw,ballSpeed);









