export class Ball {
    x = 0;
    y = 0;
    speed = Math.random() * (3 - 1) + 1;
    direction = Math.random() * 2 * Math.PI;
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

    tryCollison(ball, requireDistance = 0) {
        let distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        return distance < this.size + ball.size + requireDistance;
    }

}

export class Board {
    height = 0;
    width = 0;
    ctx = null;
    balls = [];
    cursor = {x: 0, y: 0, size: 50};
    constructor(height, width, ctx, timer = 1000 * 60) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
    }

    add(object) {
        if (object.move)
            this.balls.push(object);
    }

    addManyBalls(count) {
        for (let i = 0; i < count; i++) {
            this.add(new Ball(Math.random() * this.width, Math.random() * this.height, Math.random() * (20 - 10) + 10, i));
        }
    }

    removeBalls(count){
        this.balls.splice(0, count);
    }

    nextFrame() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let object of this.balls) {
            const data = this.calculateMove(object);
            object.move(data.x, data.y, this.ctx);
            this.calcualteLine(object);
        }
        this.drawCursor();
    }

    calculateMove(object) {
        this.bounce(object);
        this.bounceFromCursor(object);
        let x = object.x + object.speed * Math.cos(object.direction);
        let y = object.y + object.speed * Math.sin(object.direction);

        return { x, y };
    }

    calcualteLine(object) {
        for (let ball of this.balls) {
            if (ball.tryCollison(object, this.width * 0.1)) {
                this.connectBals(object, ball);
            }
        }
    }

    connectBals(ball1, ball2) {
        this.ctx.beginPath();
        this.ctx.moveTo(ball1.x, ball1.y);
        this.ctx.lineTo(ball2.x, ball2.y);
        this.ctx.stroke();
    }

    bounce(ball) {
        if (ball.x + ball.size < 0 || ball.x + ball.size > this.width) {
            ball.direction = Math.PI - ball.direction;
        }
        if (ball.y + ball.size < 0 || ball.y + ball.size> this.height) {
            ball.direction = 2 * Math.PI - ball.direction;
        }
    }

    bounceFromCursor(ball) {
        if (ball.tryCollison(this.cursor, 0)) {
            let x = ball.x - this.cursor.x;
            let y = ball.y - this.cursor.y;
            let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            let newDirection = Math.acos(x / distance);
            if (y < 0) {
                newDirection = 2 * Math.PI - newDirection;
            }
            ball.direction = newDirection;
        }
    }

    moveCursor(x, y) {
        this.cursor.x = x;
        this.cursor.y = y;
    }

    drawCursor() {
        this.ctx.beginPath();
        this.ctx.arc(this.cursor.x, this.cursor.y, this.cursor.size, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fill();
        this.ctx.stroke();
    }

}
