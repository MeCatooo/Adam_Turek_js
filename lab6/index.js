import { Board } from "./board.js";
import { Ball } from "./ball.js";

let board = setup();
let gamma = 0;
let beta = 0;

window.addEventListener("deviceorientation", (event) => {
    const alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
    document.getElementById("alpha").innerHTML = alpha;
    document.getElementById("beta").innerHTML = beta;
    document.getElementById("gamma").innerHTML = gamma;

    const angle = (Math.atan2(beta, gamma) * 180) / Math.PI;
    const speed = (Math.abs(beta) + Math.abs(gamma)) / 2;
    document.getElementById("angle").innerHTML = angle;
    document.getElementById("speed").innerHTML = speed;

});

let aniamte = () => {
    board.nextFrame(beta, gamma);
    requestAnimationFrame(aniamte);
};

requestAnimationFrame(aniamte);

function setup() {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let tmpboard = new Board(c.height, c.width, ctx);
    let ball = new Ball(c.width/2, c.height/2, 10);
    tmpboard.add(ball);
    tmpboard.addManyHoles(10);
    return tmpboard;
}
