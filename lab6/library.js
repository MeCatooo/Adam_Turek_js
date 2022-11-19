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
    scorePoints = 0;
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
        if (object.move)
            this.balls.push(object);
        else
            this.holes.push(object);
    }
    addManyHoles(count) {
        for (let i = 0; i < count; i++) {
            this.add(new Hole(Math.random() * this.width, Math.random() * this.height, 10, i));
        }
    }
    nextFrame(beta, gamma) {
        if (this.isFinished || this.holes.length === 0) {
            return this.gameOver();
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
            if (hole.tryCollison(ball) && hole.number === this.scorePoints) {
                this.resetBall();
                this.score();
            }
        }
    }
    resetBall() {
        this.balls.forEach(ball => ball.move(this.width / 2, this.height / 2, this.ctx));
    }
    score() {
        this.holes.shift();
        this.scorePoints++;
        document.getElementById("score").innerText = this.scorePoints;
    }
    setTimer(timer) {
        setTimeout(() => {
            this.isFinished = true;
        }, timer);
    }
    gameOver() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.font = "60px Arial";
        this.ctx.fillText("Game Over", 0, this.height / 2);
    }
}

export class Hole {
    x = 0;
    y = 0;
    size = 0;
    number = 0;
    displayNumber = 0;
    constructor(x, y, size, number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.number = number;
        this.displayNumber = number + 1;
    }
    draw(ctx, color = "black") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.displayNumber, this.x - 12, this.y + 7);
        ctx.stroke();
    }
    tryCollison(ball) {

        let distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        return distance < this.size + ball.size;
    }
}