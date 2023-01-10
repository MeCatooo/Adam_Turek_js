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
