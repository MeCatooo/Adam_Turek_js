window.addEventListener('deviceorientation', (event) => {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    document.getElementById('alpha').innerHTML = alpha;
    document.getElementById('beta').innerHTML = beta;
    document.getElementById('gamma').innerHTML = gamma;
});

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
engine.world.gravity.y = 0;


// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});


const width = window.screen.width + 10;
const height = window.screen.height + 10;
render.canvas.width = width - 50;


// create two boxes and a ground
var boxA = Bodies.rectangle(100, 200, 80, 80);
var boxB = Bodies.rectangle(150, 50, 80, 80);
var ground = Bodies.rectangle(width/2, 600, width, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, height/2, 60, height, { isStatic: true });
var rightWall = Bodies.rectangle(width, height/2, 60, height, { isStatic: true });
var roof = Bodies.rectangle(width/2, 0, width, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground,roof, leftWall, rightWall]);




const vector = Matter.Vector.create(10, -10);
Matter.Body.setVelocity(boxA, vector);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);