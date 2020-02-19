import IceCreamBall from "../IceCreamGame/IceCreamBall";

export default function IceCreamCone(
  x = p.windowWidth / 2,
  y = p.windowHeight / 2 + 100,
  iceCreamBallCount = 3,
  pinyin = "",
  hanzi = "",
  audio,
  p
) {
  this.audio = audio;
  this.coneX = x;
  this.coneY = y;
  this.iceCreamBalls = [];
  this.iceCreamBallCount = iceCreamBallCount;
  this.imgBalls = replicateArray(
    [p.loadImage(require("../../images/IceCream/ice-cream-ball-default.png"))],
    this.iceCreamBallCount
  );
  this.pinyin = pinyin;
  this.hanzi = hanzi;
  this.width = 80;
  this.height = 120;

  this.setup = function() {
    let yPos = 70;
    for (let i = 0; i < this.iceCreamBallCount; i++) {
      let ball = new IceCreamBall(
        this.coneX - 10,
        this.coneY - yPos,
        "",
        p.loadImage(
          require("../../images/IceCream/ice-cream-ball-default.png")
        ),
        p
      );
      ball.unique = false;
      ball.draggable = false;
      this.iceCreamBalls.push(ball);
      yPos += 70;
      this.height += 100;
    }
  };

  this.show = function(imgCone) {
    p.pop();
    p.image(imgCone, this.coneX, this.coneY, this.width, 120);
    p.fill(100);
    p.textSize(50);
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.text(this.pinyin, this.coneX + 35, this.coneY + 180);
    if (this.iceCreamBalls.length !== 0) {
      for (let i = 0; i < this.iceCreamBalls.length; i++) {
        this.iceCreamBalls[i].show(this.imgBalls[i]);
      }
    }
    p.push();
  };

  this.collides = function(iceCreamBall) {
    if (
      this.coneX < iceCreamBall.ballX + 100 &&
      this.coneX + this.width > iceCreamBall.ballX &&
      this.coneY - this.height / 2 < iceCreamBall.ballY + 100 &&
      this.coneY + this.height > iceCreamBall.ballY
    ) {
      // collision detected!
      return true;
    } else {
      return false;
    }
  };

  this.addNewIceCreamBall = function(iceCreamBall) {
    let notAdded = true;
    let index = 0;
    while (notAdded) {
      if (this.iceCreamBalls[index].unique === false) {
        let oldIceCreamBall = this.iceCreamBalls.splice(index, 1)[0];
        iceCreamBall.ballX = oldIceCreamBall.ballX;
        iceCreamBall.ballY = oldIceCreamBall.ballY;
        this.iceCreamBalls.splice(index, 0, iceCreamBall);
        notAdded = false;
      } else {
        if (index === this.iceCreamBalls.length) {
          alert("Ice cream cone is full!");
          return;
        }
        index += 1;
      }
    }
  };
}

// credits to : https://stackoverflow.com/questions/30228902/duplicate-an-array-an-arbitrary-number-of-times-javascript
function replicateArray(array, n) {
  // Create an array of size "n" with undefined values
  var arrays = Array.apply(null, new Array(n));

  // Replace each "undefined" with our array, resulting in an array of n copies of our array
  arrays = arrays.map(function() {
    return array;
  });

  // Flatten our array of arrays
  return [].concat.apply([], arrays);
}
