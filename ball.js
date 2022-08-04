class Ball {
  constructor(x, y) {
    var options = {
      isStatic: false
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, { collisionFilter: { group: -5 } });
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    push();
    image(marbleImg, pos.x, pos.y, this.r, this.r);
    pop();
  }
}