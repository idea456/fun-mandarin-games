import React, { useState } from "react";
import "../styles/IceCreamGame.css";
import P5Wrapper from "react-p5-wrapper";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { levels } from "../data/IceCreamGame/IceCreamGame";

import IceCreamGameLevels from "../pages/IceCreamGameLevels";
import IceCreamBall from "../components/IceCreamGame/IceCreamBall";
import IceCreamCone from "../components/IceCreamGame/IceCreamCone";

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

function IceCreamGame(props) {
  let { path } = useRouteMatch();
  let { levelId, levelName } = useParams();
  let score = 0;

  const [end, setEnd] = useState(false);
  const [showModal, setModal] = useState(false);

  const indexOfLevelName = () => {
    for (let i = 0; i < levels[levelId].length; i++) {
      if (levels[levelId][i][0] === levelName) {
        return i;
      }
    }
  };

  let level = levels[levelId][indexOfLevelName()][2];

  const onRestartGame = () => {
    window.location.reload();
  };

  const createHanzis = () => {
    let ret = [];
    for (let i = 0; i < level.length; i++) {
      ret.push([level[i][0], level[i][2]]);
    }
    return ret;
  };

  let hanzis = createHanzis();

  const sketch = p => {
    // reload the page just once

    p.preload = function() {
      imgCone = p.loadImage(require("../images/IceCream/ice-cream-cone.png"));
      imgBalls = [
        p.loadImage(require("../images/IceCream/ice-cream-ball-1.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-2.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-3.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-4.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-5.png")),
        p.loadImage(require("../images/IceCream/ice-cream-ball-6.png"))
      ];
      imgBallDefault = p.loadImage(
        require("../images/IceCream/ice-cream-ball-default.png")
      );
      font = p.loadFont(require("../fonts/KaiTi.ttf"));
      bg = p.loadImage(require("../images/IceCream/background.jpg"));
    };

    window.onload = function() {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };

    p.setup = () => {
      window.onload();
      p.createCanvas(p.windowWidth, p.windowHeight);
      let coor = spawn(level.length, p);
      for (let i = 0; i < level.length; i++) {
        let cone = new IceCreamCone(
          coor[i][0],
          coor[i][1],
          level[i][2],
          level[i][1],
          level[i][0],
          level[i][3],
          p
        );
        cone.setup();
        iceCreamCones.push(cone);
      }
      while (hanzis.length !== 0) {
        console.log(true);
        dropIceCreamBalls();
      }
    };

    p.draw = () => {
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
                score += 1;
                if (iceCreamBalls.length === 0) {
                  let audio = new Audio(
                    require("../audio/IceCreamGame/you-win.mp3")
                  );
                  audio.play();
                  setEnd(true);
                  setModal(true);
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
      if (hanzis.length === 0) {
        return;
      }
      let index = Math.floor(Math.random() * hanzis.length);
      // if there is still hanzi to drop in the hanzis list
      if (hanzis[index][1] !== 0) {
        hanzis[index][1] -= 1;
        // let x = Math.floor(Math.random() * (windowWidth - 100));
        let x = 100;
        let hanziBall = new IceCreamBall(
          p.windowWidth / 2 - 60,
          10,
          hanzis[index][0],
          imgBalls[Math.floor(Math.random() * imgBalls.length)],
          p
        );
        index = Math.floor(Math.random() * imgBalls.length);
        iceCreamBalls.push([hanziBall, index]);
      } else {
        hanzis.splice(index, 1);
      }
    };
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Switch>
      <Route path={path}>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>You win!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger">
              <Link style={{ color: "white" }} to="/ice-cream-levels">
                Quit
              </Link>
            </Button>

            <Button
              style={{ color: "white" }}
              variant="warning"
              onClick={onRestartGame}
            >
              Restart
            </Button>
          </Modal.Footer>
        </Modal>
        <P5Wrapper sketch={sketch} />
      </Route>

      <Route path="/ice-cream-levels">
        <IceCreamGameLevels />
      </Route>
    </Switch>
  );
}

export default IceCreamGame;
