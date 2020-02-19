import React from "react";
import P5Wrapper from "react-p5-wrapper";
import { Link, withRouter } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

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
let levelHanzi = [
  ["狗", require("../audio/SpaceInvaders/狗.mp3")],
  ["牛", require("../audio/SpaceInvaders/牛.mp3")],
  ["虎", require("../audio/SpaceInvaders/虎.mp3")],
  ["蛇", require("../audio/SpaceInvaders/蛇.mp3")],
  ["马", require("../audio/SpaceInvaders/马.mp3")],
  ["羊", require("../audio/SpaceInvaders/羊.mp3")],
  ["猴", require("../audio/SpaceInvaders/猴.mp3")],
  ["猪", require("../audio/SpaceInvaders/猪.mp3")]
];

let hanzis = obstaclesHanzis.concat(levelHanzi);

let gameWidth = window.innerWidth;
let hanziSpeed = 1;

class SpaceInvaders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      end: false,
      showModal: false,
      score: 0,
      quit: false
    };

    this.sketch = this.sketch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.restartLevel = this.restartLevel.bind(this);
    this.quitLevel = this.quitLevel.bind(this);
  }

  sketch(p) {
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
      p.createCanvas(window.innerWidth, window.innerHeight);

      ship = new Ship(p);

      speedInterval = setInterval(() => {
        // if hanziSpeed reaches maximum(20) then stop adding
        hanziSpeed += hanziSpeed >= 8 ? 0 : 1;
      }, 10000);

      dropInterval = setInterval(dropHanzi, 1500);
    };

    this.someFunction = function() {
      console.log("yay it works");
    };

    const dropHanzi = () => {
      let hanzi = hanzis[Math.floor(Math.random() * hanzis.length)];
      hanzisList.push(
        new Hanzi(
          Math.floor(Math.random() * (gameWidth * 0.8)),
          -150,
          hanzi[0],
          hanziSpeed,
          imgPlanets[Math.floor(Math.random() * imgPlanets.length)],
          hanzi[1],
          p
        )
      );
    };

    p.draw = () => {
      console.log("lasers: ", lasers);
      console.log("hanzisList: ", hanzisList);
      if (this.state.quit) {
        p.noLoop();
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

      // setTimeout(() => this.setState({ showModal: false }), 3000);

      // loop to iterate through lasers array to draw the lasers
      for (let i = 0; i < lasers.length; i++) {
        lasers[i].show(imgLaser);
        lasers[i].move();

        for (let j = 0; j < hanzisList.length; j++) {
          try {
            if (lasers[i].hits(hanzisList[j])) {
              // the laser hits a level hanzi
              if (lasers[i].hitsHanzi(hanzisList[j], levelHanzi)) {
                // play pinyin audio here
                // let audio = new Audio()
                this.setState({ score: this.state.score + 1 });
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
              hanzisList.splice(i, 1);
            }
            if (ship.hits(hanzisList[i])) {
              this.setState({ showModal: true, end: true });
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
  }

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
    this.props.history.push("/");
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
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
            <Card.Title>Hanzi to shoot</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </Card>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Game over</Modal.Title>
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

export default withRouter(SpaceInvaders);
