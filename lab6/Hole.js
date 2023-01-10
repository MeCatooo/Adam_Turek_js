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
        let distance = Math.sqrt(
            Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2)
        );
        return distance < this.size + ball.size;
    }
}
