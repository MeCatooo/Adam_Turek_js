export class Ball {
    x = 0;
    y = 0;
    speedX = Math.random() * (10 - 1) + 1;
    speedY = Math.random() * (100 - 50) + 1;
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
    cursor = {x: 0, y: 0, range: 50};
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
            this.add(new Ball(Math.random() * this.width, Math.random() * this.height, Math.random() * 20, i));
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
    }
    calculateMove(object) {
        this.bounce(object);
        let x = object.x + Math.cos((Math.PI * object.direction) / 180) * object.speedX;
        let y = object.y + Math.sin((Math.PI * object.direction) / 180) * object.speedY;

        return { x, y };
    }
    calcualteLine(object) {
        for (let ball of this.balls) {
            if (ball.tryCollison(object, 100)) {
                this.connectBals(object, ball);
            }
        }
    }
    connectBals(ball1, ball2) {
        //connect balls with line
        this.ctx.beginPath();
        this.ctx.moveTo(ball1.x, ball1.y);
        this.ctx.lineTo(ball2.x, ball2.y);
        this.ctx.stroke();


    }

    bounce(ball) {
        if (ball.x + ball.size < 0 || ball.x + ball.size > this.width) {
            ball.speedX *= -1;
        }
        if (ball.y + ball.size < 0 || ball.y + ball.size> this.height) {
            ball.speedY *= -1;
        }
        this.bounceFromCursor(ball);
    }

    //bounce from cursor
    bounceFromCursor(ball) {
        if (ball.x +ball.size - this.cursor.x - this.cursor.range < 0 && ball.x +ball.size - this.cursor.x + this.cursor.range > 0) {
            ball.speedX *= -1;
        }
        if (ball.y +ball.size - this.cursor.y - this.cursor.range < 0 && ball.y +ball.size - this.cursor.y + this.cursor.range > 0) {
            ball.speedY *= -1;
        }
    }

    moveCursor(x, y) {
        this.cursor.x = x;
        this.cursor.y = y;
    }
}

// export class Hole {
//     x = 0;
//     y = 0;
//     size = 0;
//     number = 0;
//     displayNumber = 0;
//     constructor(x, y, size, number) {
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.number = number;
//         this.displayNumber = number + 1;
//     }
//     draw(ctx, color = "black") {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//         ctx.fillStyle = color;
//         ctx.fill();
//         ctx.font = "18px Arial";
//         ctx.fillStyle = "white";
//         ctx.fillText(this.displayNumber, this.x - 12, this.y + 7);
//         ctx.stroke();
//     }
//     tryCollison(ball) {

//         let distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
//         return distance < this.size + ball.size;
//     }
// }