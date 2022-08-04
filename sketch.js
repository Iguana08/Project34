
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var platformImg, bowlImg;
var backgroundImg;
var marbleImg;

var platform, bowl;
var rope, rope2;

var platform_con, platform_con2;
var ropeY = 550;
var rope2Y = 550;

var rotation;

var ball;
var balls = [];

function preload() {
  platformImg = loadImage ("./assets/glassPlatform.png");
  bowlImg = loadImage ("./assets/glassDish.png");
  //backgroundImg = loadImage ("./assets/background.png");
  backgroundImg = loadImage ("./assets/blurBg.png");
  marbleImg = loadImage ("./assets/marble.png");
}

function setup() {
  createCanvas(800,1000);

  engine = Engine.create();
  world = engine.world;
  
  rope = new Rope(8, {x:200, y:ropeY}, { x: -25, y: 0 }, -5);
  rope2 = new Rope(8, {x:400, y:rope2Y}, { x: -25, y: 0 }, -5);

  platform = Bodies.rectangle(750, 750, 250, 20);
  bowl = new Rope (6, { x: 600, y: 400 }, { x: 800, y: 400 }, 5)

  Matter.Composite.add(rope.body,platform);
  Matter.Composite.add(rope2.body,platform);

  platform_con = new Link(rope,platform);
  platform_con2 = new Link(rope2,platform);

  ball = new Ball(300,500);
  balls.push(ball);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
}


function draw() 
{
  background(52);
  image(backgroundImg, 400, 500, 800, 1000);

  Engine.update(engine);

  for (var i = 0; i < balls.length; i++) {
    showBall(balls[i],i);
  }
  push();
  angleMode(DEGREES);
  rotation = platform.angle;
  rotate(rotation);
  image(platformImg, platform.position.x, platform.position.y, 250, 35);
  pop();
  push();
  //rotate(45);
  image(platformImg, 215, ropeY + 25, 35, 40);
  image(platformImg, 385, rope2Y + 25, 35, 40);
  pop();
  image(bowlImg, 700, 400, 200, 100);

  rope.show();
  rope2.show();
  bowl.show();
  
  platform.depth = ball.depth;
  ball.depth = ball.depth + 3;
}

function keyPressed() {
  if (keyCode === 32) {
    var ball = new Ball(300,400);
    balls.push(ball);
  }

  if (keyCode === 87 && ropeY >= 100) {
    Matter.World.remove(world, rope.body);
    Matter.World.remove(world, platform_con);

    ropeY -= 22;
    rope = new Rope(8, {x:200, y:ropeY}, -5);
    platform_con = new Link(rope,platform);
  }

  if (keyCode === 83 && ropeY <= 700) {
    Matter.World.remove(world, rope.body);
    Matter.World.remove(world, platform_con);

    ropeY += 22;
    rope = new Rope(8, {x:200, y:ropeY}, -5);
    platform_con = new Link(rope,platform);
  }
  
  if (keyCode === UP_ARROW && rope2Y >= 100) {
    Matter.World.remove(world, rope2.body);
    Matter.World.remove(world, platform_con2);

    rope2Y -= 22;
    rope2 = new Rope(8, {x:400, y:rope2Y}, -5);
    platform_con2 = new Link(rope2,platform);
  }

  if (keyCode === DOWN_ARROW && rope2Y <= 700) {
    Matter.World.remove(world, rope2.body);
    Matter.World.remove(world, platform_con2);

    rope2Y += 22;
    rope2 = new Rope(8, {x:400, y:rope2Y}, -5);
    platform_con2 = new Link(rope2,platform);
  }
}

function showBall(ball1, i) {
  if (ball1) {
    ball1.show();
    if (ball1.body.position.x >= 1100) {
      delete balls[i];
      Matter.World.remove(world, ball1.body);
    }
  }
}