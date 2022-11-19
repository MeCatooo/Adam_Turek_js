export class Ball {
    x = 0;
    y = 0;
    size = 0;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
    move(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.draw(ctx);
    }
}
export class Board {
    height = 0;
    width = 0;
    isFinished = false;
    ctx = null;
    balls = [];
    holes = [];
    constructor(height, width, ctx, timer = 1000 * 60) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.setTimer(timer);
    }
    add(object) {
        if(object.move)
            this.balls.push(object);
        else
            this.holes.unshift(object);
    }
    nextFrame(beta, gamma) {
        if (this.isFinished) {
            return;
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.holes.forEach(hole => hole.draw(this.ctx));
        for (let object of this.balls) {
                const data = this.calculateMove(beta, gamma, object);
                object.move(data.x, data.y, this.ctx);
                this.calcualteCollisions(object);
        }
    }
    calculateMove(beta, gamma, object) {
        const angle = (Math.atan2(beta, gamma) * 180) / Math.PI;
        const speed = (Math.abs(beta) + Math.abs(gamma)) / 20;
        const x = object.x + Math.cos((Math.PI * angle) / 180) * speed;
        const y = object.y + Math.sin((Math.PI * angle) / 180) * speed;
        
        if (x < 0 || x > this.width || y < 0 || y > this.height) {
            return { x: object.x, y: object.y };
        }
        return { x, y };
    }
    calcualteCollisions(ball) {
        for (let hole of this.holes) {
            if (hole.tryCollison(ball)) {
                this.resetBall();
                this.score();
            }
        }
    }
    resetBall() {
        this.balls.forEach(ball => ball.move(this.width / 2, this.height / 2, this.ctx));
    }
    score() {
        let score = document.getElementById("score");
        score.innerHTML = parseInt(score.innerHTML) + 1;
    }
    setTimer(timer){
        setTimeout(() => {
            this.isFinished = true;
        }, timer);
    }
}

export class Hole{
    x = 0;
    y = 0;
    size = 0;
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    }
    tryCollison(ball){
        let distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        return distance < this.size + ball.size;
    }
}