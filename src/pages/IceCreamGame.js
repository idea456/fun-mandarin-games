import React from "react";
import "../styles/IceCreamGame.css";
import P5Wrapper from "react-p5-wrapper";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import IceCreamBall from "../components/IceCreamGame/IceCreamBall";
import IceCreamCone from "../components/IceCreamGame/IceCreamCone";

import { levels, hanzis } from "../data/IceCreamGame/IceCreamGame";

let levelIndex = 0;
let hanziIndex = 0;
let score = 0;
let iceCreamCones = [];
let iceCreamBalls = [];
let imgBalls = [];
let dragging = false;
let offsetX;
let offsetY;
let time = "";
let font;
let imgCone;
let imgBallDefault;
let bg;

function spawn(count, p) {
  if (count === 1) {
    return [[p.windowWidth / 2 - 50, p.windowHeight - 220]];
  } else {
    let coor = [];
    let initialX = p.windowWidth / 2 - 50;
    // modify this scale to increase space between the cones
    let scale = 1000 / count;
    if (count % 2 !== 0) {
      coor.push([p.windowWidth / 2 - 50, p.windowHeight - 220]);
    } else {
      scale -= 30;
    }
    for (let i = 1; i < count + 1; i++) {
      coor.push([initialX + scale * i, p.windowHeight - 220]);
      coor.push([initialX - scale * i, p.windowHeight - 220]);
    }
    return coor;
  }
}

class IceCreamGame extends React.Component {
  constructor() {
    super();
    this.state = {
      end: false,
      showModal: false,
      score: 0,
      nextLevel: false
    };
    this.sketch = this.sketch.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  sketch(p) {
    // reload the page just once
    window.onload = function() {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };

    p.preload = function() {
      imgCone = p.loadImage(require("../images/IceCream/ice-cream-cone.png"));
      imgBalls = [
        p.loadImage(require("../images/IceCream/ice-cream-ball-1.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-2.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-3.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-4.png"))
      ];
      imgBallDefault = p.loadImage(
        require("../images/IceCream/ice-cream-ball-default.png")
      );
      font = p.loadFont(require("../fonts/KaiTi.ttf"));
      bg = p.loadImage(require("../images/IceCream/background.jpg"));
    };

    p.setup = function() {
      window.onload();
      // startTimer(120);
      p.createCanvas(p.windowWidth, p.windowHeight);
      let coor = spawn(levels[levelIndex].length, p);
      for (let i = 0; i < levels[levelIndex].length; i++) {
        let cone = new IceCreamCone(
          coor[i][0],
          coor[i][1],
          levels[levelIndex][i][2],
          levels[levelIndex][i][1],
          levels[levelIndex][i][0],
          levels[levelIndex][i][3],
          p
        );
        cone.setup();
        iceCreamCones.push(cone);
      }
      while (hanzis[hanziIndex].length !== 0) {
        console.log(true);
        dropIceCreamBalls();
      }
    };

    p.draw = () => {
      if (this.state.end) {
        if (this.state.nextLevel) {
          goToNextLevel();
        }
      }
      p.background(bg);

      for (let i = 0; i < iceCreamCones.length; i++) {
        iceCreamCones[i].show(imgCone, imgBallDefault);
      }

      p.textSize(30);
      p.textAlign(p.LEFT);
      p.fill(0);
      p.text(`score : ${score}`, p.windowWidth - 250, 60);
      p.text(time, p.windowWidth - 250, 140);
      p.textFont(font);

      if (iceCreamBalls.length !== 0) {
        console.log(iceCreamBalls);
        iceCreamBalls[0][0].show(imgBalls[iceCreamBalls[0][1]]);
      }

      for (let i = 0; i < iceCreamBalls.length; i++) {
        if (iceCreamBalls[i][0].dragged && dragging) {
          iceCreamBalls[i][0].ballX = p.mouseX + offsetX;
          iceCreamBalls[i][0].ballY = p.mouseY + offsetY;
        }
      }
    };

    p.mousePressed = function() {
      for (let i = 0; i < iceCreamBalls.length; i++) {
        if (
          p.mouseX > iceCreamBalls[i][0].ballX &&
          p.mouseX < iceCreamBalls[i][0].ballX + 100 &&
          p.mouseY > iceCreamBalls[i][0].ballY &&
          p.mouseY < iceCreamBalls[i][0].ballY + 100 &&
          dragging === false &&
          iceCreamBalls[i][0].draggable === true
        ) {
          iceCreamBalls[i][0].dragged = true;
          dragging = true;
          offsetX = iceCreamBalls[i][0].ballX - p.mouseX;
          offsetY = iceCreamBalls[i][0].ballY - p.mouseY;
        }
      }
    };

    p.mouseReleased = () => {
      try {
        for (let i = 0; i < iceCreamBalls.length; i++) {
          iceCreamBalls[i][0].dragged = false;
          dragging = false;
        }

        for (let i = 0; i < iceCreamBalls.length; i++) {
          for (let j = 0; j < iceCreamCones.length; j++) {
            if (iceCreamCones[j].collides(iceCreamBalls[i][0])) {
              if (iceCreamCones[j].hanzi === iceCreamBalls[i][0].hanzi) {
                let audio = new Audio(iceCreamCones[j].audio);
                audio.play();
                iceCreamCones[j].addNewIceCreamBall(iceCreamBalls[i][0]);
                iceCreamBalls.splice(i, 1);
                this.setState({ score: this.state.score + 1 });
                if (iceCreamBalls.length === 0) {
                  this.setState({ end: true, showModal: true });
                }
              } else {
                iceCreamBalls[i][0].ballX = p.windowWidth / 2 - 60;
                iceCreamBalls[i][0].ballY = 10;
              }
            }
          }
        }
      } catch {
        return;
      }
    };

    const dropIceCreamBalls = () => {
      if (hanzis[hanziIndex].length === 0) {
        return;
      }
      let index = Math.floor(Math.random() * hanzis[hanziIndex].length);
      // if there is still hanzi to drop in the hanzis list
      if (hanzis[hanziIndex][index][1] !== 0) {
        hanzis[hanziIndex][index][1] -= 1;
        // let x = Math.floor(Math.random() * (windowWidth - 100));
        let x = 100;
        let hanziBall = new IceCreamBall(
          p.windowWidth / 2 - 60,
          10,
          hanzis[hanziIndex][index][0],
          imgBalls[Math.floor(Math.random() * imgBalls.length)],
          p
        );
        index = Math.floor(Math.random() * imgBalls.length);
        iceCreamBalls.push([hanziBall, index]);
      } else {
        hanzis[hanziIndex].splice(index, 1);
      }
    };

    const goToNextLevel = () => {
      this.setState({
        score: 0,
        nextLevel: false,
        end: false,
        showModal: false
      });

      if (levelIndex === levels.length) {
        alert("reached last level!");
      }

      levelIndex += levelIndex === levels.length - 1 ? 0 : 1;
      hanziIndex += hanziIndex === hanzis.length - 1 ? 0 : 1;
      iceCreamCones = [];
      iceCreamBalls = [];
      p.setup();
    };
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Total score: {this.state.score}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCloseModal}>
              Quit
            </Button>
            <Button
              variant="info"
              onClick={() => this.setState({ nextLevel: true })}
            >
              Next Level
            </Button>
          </Modal.Footer>
        </Modal>
        <P5Wrapper sketch={this.sketch} />
      </>
    );
  }
}

export default IceCreamGame;
