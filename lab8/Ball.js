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
