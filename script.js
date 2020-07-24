
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = "red";
function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function draw(){

    const ballColorArray = ["red","green","blue","#0095DD"];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    
    if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
        ballColor = ballColorArray[Math.floor(Math.random()*4)];
    } else if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        ballColor = ballColorArray[Math.floor(Math.random()*4)];
    } 
    
    x += dx;
    y += dy;
}

setInterval(draw,0);




