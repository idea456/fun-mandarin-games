export default function Ship(p) {
  this.speed = 1;
  this.scale = 70;
  this.xDir = 0;
  this.x = p.windowWidth / 2 - this.scale;
  this.y = p.windowHeight - this.scale;

  this.show = function(img) {
    p.image(img, this.x, this.y, this.scale, this.scale);
  };

  this.setDir = function(dir) {
    this.xDir = dir;
  };

  this.move = function() {
    this.x += this.xDir * 10;
  };

  this.hits = function(hanzi) {
    try {
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
    } catch {}
  };
}
