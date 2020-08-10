'use stirct';

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "red";
        this.dx = 2;
        this.dy = -2;
    }

    changeColor () {
        const ballColorArray = ["red","green","blue","#0095DD"];
        this.color = ballColorArray[Math.floor(Math.random()*4)];
    }

    move () {
        this.x += this.dx
        this.y += this.dy
    }
}
