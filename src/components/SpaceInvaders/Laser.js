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

  // credits to https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  this.hits = function(hanzi) {
    if (
      this.x < hanzi.x + 150 &&
      this.x + 10 > hanzi.x &&
      this.y < hanzi.y + 150 &&
      this.y + 40 > hanzi.y
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
