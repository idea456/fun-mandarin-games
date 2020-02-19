export default function IceCreamBall(
  x,
  y,
  hanzi = "",
  img = p.loadImage("images/ice-cream-ball-default.png"),
  p
) {
  this.ballX = x;
  this.ballY = y;
  this.hanzi = hanzi;
  this.ballSpeed = 1;
  this.img = img;
  this.dragged = false;
  this.draggable = true;
  this.unique =
    this.img === p.loadImage("images/ice-cream-ball-default.png")
      ? false
      : true;

  this.show = function(img) {
    p.push();
    p.image(this.img, this.ballX, this.ballY, 100, 100);
    p.textSize(40);
    p.textAlign(p.CENTER);
    p.textFont("kaiTi");
    p.fill(0);
    p.text(this.hanzi, this.ballX, this.ballY + 25, 100, 100);
    p.pop();
  };

  this.fall = function() {
    this.ballY += this.ballSpeed;
    if (this.ballY > p.windowHeight + 100) {
      this.ballX = 100;
      this.ballY = -100;
    }
  };
}
