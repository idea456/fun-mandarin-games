export default function Ship(p) {
  this.speed = 1;
  this.scale = 70;
  this.xDir = 0;
  this.x = p.windowWidth / 2 - this.scale;
  this.y = p.windowHeight - this.scale;

  this.show = function(img) {
    p.push();
    p.image(img, this.x, this.y, this.scale, this.scale);
    p.pop();
  };

  this.setDir = function(dir) {
    this.xDir = dir;
  };

  this.move = function() {
    this.x += this.xDir * 10;
  };

  // credits to http://www.jeffreythompson.org/collision-detection/circle-rect.php
  this.collidesWithPlanet = function(hanzi) {
    let cx = hanzi.x;
    let cy = hanzi.y;
    let radius = hanzi.imgScale;

    let rx = this.x;
    let ry = this.y;
    let rw = this.scale;
    let rh = this.scale;

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;

    // which edge is closest?
    if (cx < rx) testX = rx;
    // test left edge
    else if (cx > rx + rw) testX = rx + rw; // right edge
    if (cy < ry) testY = ry;
    // top edge
    else if (cy > ry + rh) testY = ry + rh; // bottom edge

    // get distance from closest edges
    let distX = cx - testX;
    let distY = cy - testY;
    let distance = Math.sqrt(distX * distX + distY * distY);

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
  };

  this.hits = function(hanzi) {
    try {
      if (
        this.x < hanzi.x + hanzi.imgScale &&
        this.x + 10 > hanzi.x &&
        this.y < hanzi.y + hanzi.imgScale &&
        this.y + 40 > hanzi.y
       && this.collidesWithPlanet(hanzi)) {
        return true;
        // collision detected!
      } else {
        return false;
      }
    } catch {}
  };
}
