export default function Hanzi(x, y, hanzi, speed, img, audio, p) {
  //   this.x = Math.floor(Math.random() * 600);
  //   this.y = Math.floor(Math.random() * (100 + 200 + 1) - 200);
  this.x = x;
  this.y = y;
  this.hanzi = hanzi[0];
  this.pinyin = hanzi[1];
  this.speed = speed;
  this.img = img;
  this.imgScale = 150;
  this.show = true;
  this.audio =
    audio === "" ? require("../../audio/SpaceInvaders/explosion.wav") : audio;

  this.show = function() {
    p.image(this.img, this.x, this.y, this.imgScale, this.imgScale);
    p.textAlign(p.CENTER);
    p.textSize(60);
    p.fill(10);
    p.text(
      this.hanzi,
      this.x + this.imgScale / 2,
      this.y + this.imgScale / 2 + 5
    );
  };

  this.fall = function() {
    this.y += this.speed;
  };

  this.showExplosion = function(explosionImg) {
    this.img = explosionImg;
  };
}
