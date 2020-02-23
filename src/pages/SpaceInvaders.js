import React from "react";
import P5Wrapper from "react-p5-wrapper";
import { Link, withRouter } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "../styles/SpaceInvaders.css";

import Ship from "../components/SpaceInvaders/Ship";
import Laser from "../components/SpaceInvaders/Laser";
import Hanzi from "../components/SpaceInvaders/Hanzi";

let img;
let imgLaser;
let imgExplosion;
let imgBackground;
let imgPlanets;
let ship;
let font;
let speedInterval;
let dropInterval;

let lasers = [];
let hanzisList = [];

let obstaclesHanzis = [
  ["月", ""],
  ["日", ""],
  ["火", ""],
  ["青", ""],
  ["空", ""],
  ["我", ""],
  ["名", ""],
  ["前", ""],
  ["手", ""],
  ["天", ""],
  ["気", ""]
];

let gameWidth = window.innerWidth;
let hanziSpeed = 1;

class SpaceInvaders extends React.Component {
  constructor(props) {
    super(props);
    // this.levelHanzi = [
    //   ["狗", require("../audio/SpaceInvaders/狗.mp3")],
    //   ["牛", require("../audio/SpaceInvaders/牛.mp3")],
    //   ["虎", require("../audio/SpaceInvaders/虎.mp3")],
    //   ["蛇", require("../audio/SpaceInvaders/蛇.mp3")],
    //   ["马", require("../audio/SpaceInvaders/马.mp3")],
    //   ["羊", require("../audio/SpaceInvaders/羊.mp3")],
    //   ["猴", require("../audio/SpaceInvaders/猴.mp3")],
    //   ["猪", require("../audio/SpaceInvaders/猪.mp3")]
    // ];
    this.levelHanzi = this.props.level;
    this.state = {
      end: false,
      showModal: false,
      score: 0,
      quit: false,
      currentDroppingLevelHanzi: [],
      dropLevelHanzi: true,
      levelHanziIndex: 0,
      levelHanzi: this.setupLevelHanzi(),
      msg: ""
    };

    this.sketch = this.sketch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.restartLevel = this.restartLevel.bind(this);
    this.quitLevel = this.quitLevel.bind(this);
    this.setupLevelHanzi = this.setupLevelHanzi.bind(this);
  }

  setupLevelHanzi() {
    let index = Math.floor(Math.random() * this.levelHanzi.length);
    this.levelHanzi.splice(index, 1);
    this.setState({ levelHanziIndex: index });
    return this.levelHanzi[index];
  }

  sketch = p => {
    window.onload = function() {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };

    p.preload = function() {
      font = p.loadFont(require("../fonts/KaiTi.ttf"));
      imgPlanets = [
        p.loadImage(require("../images/SpaceInvaders/planet1.png")),
        p.loadImage(require("../images/SpaceInvaders/planet2.png")),
        p.loadImage(require("../images/SpaceInvaders/planet3.png")),
        p.loadImage(require("../images/SpaceInvaders/planet4.png")),
        p.loadImage(require("../images/SpaceInvaders/planet6.png"))
      ];

      img = p.loadImage(require("../images/SpaceInvaders/player-blue-1.png"));
      imgLaser = p.loadImage(
        require("../images/SpaceInvaders/laser-blue-1.png")
      );
      imgExplosion = [
        p.loadImage(require("../images/SpaceInvaders/explosion1.png"))
      ];
      imgBackground = p.loadImage(
        require("../images/SpaceInvaders/background.png")
      );
    };

    p.setup = function() {
      window.onload();
      p.createCanvas(window.innerWidth, window.innerHeight);

      ship = new Ship(p);

      speedInterval = setInterval(() => {
        // if hanziSpeed reaches maximum(20) then stop adding
        hanziSpeed += hanziSpeed >= 8 ? 0 : 1;
      }, 10000);

      dropInterval = setInterval(dropHanzi, 1500);
    };

    const dropHanzi = () => {
      console.log(this.state.levelHanziArray);
      let choice = Math.floor(Math.random() * 2);
      let hanzi;
      let unique;
      // drop obstacles hanzi
      if (choice === 0) {
        hanzi =
          obstaclesHanzis[Math.floor(Math.random() * obstaclesHanzis.length)];
        unique = false;
      } else {
        // drop level hanzi
        if (this.state.dropLevelHanzi) {
          hanzi = this.state.levelHanzi;
          unique = true;
          this.setState({ dropLevelHanzi: false });
        } else {
          return;
        }
      }

      try {
        hanzisList.push(
          new Hanzi(
            Math.floor(Math.random() * (gameWidth * 0.7)),
            -150,
            hanzi[0],
            hanziSpeed,
            imgPlanets[Math.floor(Math.random() * imgPlanets.length)],
            hanzi[1],
            unique,
            p
          )
        );
      } catch {
        hanzi =
          obstaclesHanzis[Math.floor(Math.random() * obstaclesHanzis.length)];
        unique = false;
        hanzisList.push(
          new Hanzi(
            Math.floor(Math.random() * (gameWidth * 0.7)),
            -150,
            hanzi[0],
            hanziSpeed,
            imgPlanets[Math.floor(Math.random() * imgPlanets.length)],
            hanzi[1],
            unique,
            p
          )
        );
      }
    };

    p.draw = () => {
      // all the level hanzi has been shot, means game win

      if (this.levelHanzi.length === 0 && this.state.end) {
        p.noLoop();
        clearInterval(dropInterval);
        this.setState({ showModal: true });
      } else if (this.state.end) {
        p.noLoop();
        clearInterval(dropInterval);
        this.setState({ showModal: true });
      }

      p.background(imgBackground);
      p.textFont(font);

      ship.show(img);
      ship.move();

      p.push();
      p.fill(255);
      p.textSize(40);

      p.text(`Score : ${this.state.score}`, window.innerWidth - 150, 50);
      p.push();

      // loop to iterate through lasers array to draw the lasers
      for (let i = 0; i < lasers.length; i++) {
        lasers[i].show(imgLaser);
        lasers[i].move();

        for (let j = 0; j < hanzisList.length; j++) {
          try {
            if (lasers[i].hits(hanzisList[j])) {
              // the laser hits a level hanzi
              if (hanzisList[j].unique) {
                if (this.levelHanzi.length === 0) {
                  this.setState({ end: true, msg: "You win!" });
                }
                // regenerate a new hanzi
                let index = Math.floor(Math.random() * this.levelHanzi.length);
                let hanzi = this.levelHanzi[index];
                this.setState({
                  score: this.state.score + 1,
                  levelHanzi: hanzi,
                  dropLevelHanzi: true
                });
                this.levelHanzi.splice(index, 1);
              } else {
                this.setState({
                  score: this.state.score - (this.state.score <= 0 ? 0 : 1)
                });
              }
              let audio = new Audio(hanzisList[j].audio);
              audio.play();
              let imgX = hanzisList[j].x;
              let imgY = hanzisList[j].y;
              setTimeout(p.image(imgExplosion[0], imgX, imgY, 150, 150), 2000);
              // remove the hanzi and laser
              hanzisList.splice(j, 1);
              lasers.splice(i, 1);
            }
          } catch {
            continue;
          }
        }
      }

      // loop to iterate through the hanzis array to draw the hanzis
      if (hanzisList.length !== 0) {
        for (let i = 0; i < hanzisList.length; i++) {
          if (hanzisList[i].show) {
            hanzisList[i].show();
            hanzisList[i].fall();
            // if the hanzi reaches edge of screen height
            if (hanzisList[i].y > window.innerHeight + 50) {
              // if the out of bound hanzi is a level hanzi
              if (hanzisList[i].unique) {
                hanzisList[i].x = Math.floor(
                  Math.random() * window.innerWidth * 0.7
                );
                hanzisList[i].y = -100;
              } else {
                hanzisList.splice(i, 1);
              }
            }
            if (ship.hits(hanzisList[i])) {
              this.setState({ showModal: true, end: true, msg: "You lose!" });
            }
          }
        }
      }
    };

    p.keyReleased = function() {
      if (p.key != " ") {
        ship.setDir(0);
      }
    };

    p.keyPressed = function(e) {
      try {
        e.preventDefault();
        if (p.keyCode === p.RIGHT_ARROW) {
          ship.setDir(1.5);
        } else if (p.keyCode === p.LEFT_ARROW) {
          ship.setDir(-1.5);
        } else if (p.keyCode === 32) {
          lasers.push(new Laser(ship.x + 20, ship.y, p));
          let audio = new Audio(
            require("../audio/SpaceInvaders/sfx-laser1.ogg")
          );
          audio.play();
        }
      } catch {
        return;
      }
    };
  };

  restartLevel() {
    lasers = [];
    hanzisList = [];
    hanziSpeed = 1;
    this.setState({ score: 0, end: false, showModal: false });
    window.location.reload();
  }

  quitLevel() {
    lasers = [];
    hanzisList = [];
    hanziSpeed = 1;
    clearInterval(speedInterval);
    clearInterval(dropInterval);
    speedInterval = 0;
    dropInterval = 0;
    this.setState({ score: 0, end: false, showModal: false, quit: true });
    this.props.history.push("/space-invaders-levels");
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  showText() {
    return this.state.levelHanzi[0];
  }

  render() {
    try {
      return (
        <>
          <Card
            style={{
              width: "15rem",
              position: "absolute",
              top: 100,
              left: window.innerWidth - 300
            }}
          >
            <Card.Body>
              <Card.Text
                className="card-text"
                style={{ textAlign: "center", fontSize: 100 }}
              >
                {this.state.levelHanzi[0]}
              </Card.Text>
            </Card.Body>
          </Card>

          <Modal
            show={this.state.showModal}
            onHide={this.handleClose}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>{this.state.msg}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Score : {this.state.score}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.quitLevel}>
                Quit
              </Button>
              <Button variant="warning" onClick={this.restartLevel}>
                Retry
              </Button>
            </Modal.Footer>
          </Modal>
          <P5Wrapper sketch={this.sketch} />
        </>
      );
    } catch {
      return (
        <>
          <Card
            style={{
              width: "15rem",
              position: "absolute",
              top: 100,
              left: window.innerWidth - 300
            }}
          >
            <Card.Body>
              <Card.Text
                className="card-text"
                style={{ textAlign: "center", fontSize: 100 }}
              ></Card.Text>
            </Card.Body>
          </Card>

          <Modal
            show={this.state.showModal}
            onHide={this.handleClose}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>{this.state.msg}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Score : {this.state.score}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.quitLevel}>
                Quit
              </Button>
              <Button variant="warning" onClick={this.restartLevel}>
                Retry
              </Button>
            </Modal.Footer>
          </Modal>
          <P5Wrapper sketch={this.sketch} />
        </>
      );
    }
  }
}

export default withRouter(SpaceInvaders);
