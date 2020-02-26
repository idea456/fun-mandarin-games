function Laser(x, y, p) {
  this.x = x;
  this.y = y;
  this.speed = 10;

  this.show = function(img) {
    p.image(img, this.x, this.y, 10, 40);
  };

  this.move = function() {
    this.y -= this.speed;
  };

  this.collidesWithPlanet = function(hanzi) {
    let cx = hanzi.x;
    let cy = hanzi.y;
    let radius = hanzi.imgScale;

    let rx = this.x;
    let ry = this.y;
    let rw = 10;
    let rh = 40;

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

  // credits to https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  this.hits = function(hanzi) {
    if (
      this.x < hanzi.x + hanzi.imgScale &&
      this.x + 10 > hanzi.x &&
      this.y < hanzi.y + hanzi.imgScale &&
      this.y + 40 > hanzi.y &&
      this.collidesWithPlanet(hanzi)
    ) {
      return true;
      // collision detected!
    } else {
      return false;
    }
  };

  this.hitsHanzi = function(hanzi, levelHanzi) {
    for (let i = 0; i < levelHanzi.length; i++) {
      if (hanzi === levelHanzi[i][0]) return true;
    }
    return false;
  };
}

export default Laser;
