import { Ball, Board} from "./library.js";

let board;
let aniamte = () => {
    board.nextFrame();
    requestAnimationFrame(aniamte);
};

function start() {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let tmpboard = new Board(c.height, c.width, ctx);
    tmpboard.addManyBalls(70);
    return tmpboard;
}

document.querySelector("#start").addEventListener("click", (event) => {
    event.target.disabled = true;
    board = start();
    requestAnimationFrame(aniamte);
});
document.querySelector("#reset").addEventListener("click", () => {
    board = start();
});
document.querySelector("#balls").addEventListener("change", () => {
    //if range is bigger than balls.length add balls
    //if range is smaller than balls.length remove balls
    let range = document.querySelector("#balls").value;
    if (range > board.balls.length) {
        board.addManyBalls(range - board.balls.length);
    }
    else {
        board.removeBalls(board.balls.length - range);
    }
});
document.querySelector("canvas").addEventListener("mousemove", (event) => {
    if(board)
    board.moveCursor(event.clientX, event.clientY);
});