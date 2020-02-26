import React from "react";
import "../styles/SnakeGame.css";
import { Link } from "react-router-dom";

import Snake from "../components/SnakeGame/Snake";
import Food from "../components/SnakeGame/Food";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { hanzis } from "../data/SnakeGame/SnakeGame";

// change the background here
let background = [
  require("../images/SnakeGame/background.jpg"),
  require("../images/SnakeGame/background2.jpg"),
  require("../images/SnakeGame/background3.jpg")
];

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const getRandomCoordinates = (n, obstaclesHanzi) => {
  let max = 20;
  let spawnRadius = 30;
  let ret = [];
  let overlapping = false;
  let protection = 0;

  // means its a level hanzi
  if (n === 1) {
    while (ret.length < 1) {
      //for (let i = 0; i < n; i++) {
      let x = Math.floor(Math.random() * 22) * 4;
      let y = Math.floor(Math.random() * 22) * 4;

      overlapping = false;
      for (let j = 0; j < obstaclesHanzi.length; j++) {
        let d = distance(x, y, obstaclesHanzi[j][0], obstaclesHanzi[j][1]);
        if (d < spawnRadius) {
          // they are overlapping
          overlapping = true;
          break;
        }
      }

      // if not overlapping then keep it
      if (!overlapping) {
        ret.push([x, y]);
      }

      protection++;
      if (protection > 2000) {
        break;
      }
    }
  } else {
    while (ret.length < n) {
      //for (let i = 0; i < n; i++) {
      let x = Math.floor(Math.random() * 25) * 4;
      let y = Math.floor(Math.random() * 25) * 4;

      overlapping = false;
      for (let j = 0; j < ret.length; j++) {
        let d = distance(x, y, ret[j][0], ret[j][1]);
        if (d < spawnRadius) {
          // they are overlapping
          overlapping = true;
          break;
        }
      }

      // if not overlapping then keep it
      if (!overlapping) {
        ret.push([x, y]);
      }
    }
  }

  return ret;
};
const randomKanji = list => {
  let index = Math.floor(Math.random() * list.length);
  return list[index];
};

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.levelCount = 1;
    this.level = this.props.level;
    this.background = background[Math.floor(Math.random() * background.length)];
    this.hanziCount = 2;
    this.obstacleFood = getRandomCoordinates(this.hanziCount);
    this.levelFood = getRandomCoordinates(1, this.obstacleFood);
    this.state = {
      gameOver: false,
      show: false,
      score: 0,
      kanji: randomKanji(hanzis),
      kanjiList: this.randomKanjis(4),
      levelKanji: randomKanji(this.level),
      speed: 250,
      previousDirection: "",
      direction: "RIGHT",
      snakeDots: [
        [0, 0],
        [4, 0]
      ]
    };
    this.snakeImgDirection = this.snakeImgDirection.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onRestartGame = this.onRestartGame.bind(this);
    this.onNextLevel = this.onNextLevel.bind(this);
  }

  componentDidMount() {
    // the game loop
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  // called each time the state updates
  componentDidUpdate() {
    this.checkIfOutOfBounds();
    this.checkIfCollapsed();
    this.checkIfEatFood();
    console.log(this.state.snakeDots[this.state.snakeDots.length - 1]);
  }

  onKeyDown = e => {
    e = e || window.event;
    e.preventDefault();
    switch (e.keyCode) {
      case 38:
        this.setState({
          previousDirection: this.state.direction,
          direction: "UP"
        });
        break;
      case 40:
        this.setState({
          previousDirection: this.state.direction,
          direction: "DOWN"
        });
        break;
      case 37:
        this.setState({
          previousDirection: this.state.direction,
          direction: "LEFT"
        });
        break;
      case 39:
        this.setState({
          previousDirection: this.state.direction,
          direction: "RIGHT"
        });
        break;
    }
  };

  moveSnake = () => {
    if (!this.state.gameOver) {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 4, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 4, head[1]];
          break;
        case "UP":
          head = [head[0], head[1] - 4];
          break;
        case "DOWN":
          head = [head[0], head[1] + 4];
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots
      });
    }
  };

  snakeImgDirection() {
    switch (this.state.direction) {
      case "UP":
        return require("../images/SnakeGame/snake-head-up.png");
      case "DOWN":
        return require("../images/SnakeGame/snake-head-down.png");
      case "LEFT":
        return require("../images/SnakeGame/snake-head-left.png");
      case "RIGHT":
        return require("../images/SnakeGame/snake-head-right.png");
    }
  }

  checkIfOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfEatFood() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    for (let i = 0; i < this.obstacleFood.length; i++) {
      let food = this.obstacleFood[i];
      if (head[0] === food[0] && head[1] === food[1]) {
        // collision detected between 'obstacles' food!
        this.hanziCount -= this.hanziCount === 2 ? 0 : 1;
        let audio = new Audio(require("../audio/SnakeGame/wrong.mp3"));
        audio.play();
        this.obstacleFood = getRandomCoordinates(this.hanziCount);
        this.levelFood = getRandomCoordinates(1, this.obstacleFood);
        this.setState({
          score: this.state.score - (this.state.score === 0 ? 0 : 1),
          kanji: randomKanji(hanzis),
          kanjiList: this.randomKanjis(this.hanziCount),
          levelKanji: randomKanji(this.level)
        });
        // check if the snake has shrunk too low
        if (this.state.snakeDots.length === 2) {
          this.onGameOver();
        } else {
          this.reduceSnake();
        }
      }
    }
    for (let i = 0; i < this.levelFood.length; i++) {
      let levelFood = this.levelFood[i];
      if (this.state.levelKanji[0].length === 2) {
        if (
          (head[0] === levelFood[0] && head[1] === levelFood[1]) ||
          (head[0] === levelFood[0] + 4 && head[1] === levelFood[1])
        ) {
          this.hanziCount += this.hanziCount === 5 ? 0 : 1;
          let audio = new Audio(this.state.levelKanji[1]);
          audio.play();
          this.obstacleFood = getRandomCoordinates(this.hanziCount);
          this.levelFood = getRandomCoordinates(1, this.obstacleFood);
          this.setState({
            score: this.state.score + 1,
            food: getRandomCoordinates(this.hanziCount),
            kanji: randomKanji(hanzis),
            kanjiList: this.randomKanjis(this.hanziCount),
            levelKanji: randomKanji(this.level)
          });
          this.enlargeSnake();
        }
      } else {
        if (head[0] === levelFood[0] && head[1] === levelFood[1]) {
          this.hanziCount += this.hanziCount === 5 ? 0 : 1;
          let audio = new Audio(this.state.levelKanji[1]);
          audio.play();
          this.obstacleFood = getRandomCoordinates(this.hanziCount);
          this.levelFood = getRandomCoordinates(1, this.obstacleFood);
          this.setState({
            score: this.state.score + 1,
            kanji: randomKanji(hanzis),
            kanjiList: this.randomKanjis(this.hanziCount),
            levelKanji: randomKanji(this.level)
          });
          this.enlargeSnake();
        }
      }
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({ snakeDots: newSnake });
  }

  reduceSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.pop();
    this.setState({ snakeDots: newSnake });
    if (this.state.snakeDots.length === 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    if (
      this.state.direction == "LEFT" &&
      this.state.previousDirection == "RIGHT"
    ) {
      return;
    } else if (
      this.state.direction == "RIGHT" &&
      this.state.previousDirection == "LEFT"
    ) {
      return;
    } else if (
      this.state.direction == "UP" &&
      this.state.previousDirection == "DOWN"
    ) {
      return;
    } else if (
      this.state.direction == "DOWN" &&
      this.state.previousDirection == "UP"
    ) {
      return;
    } else {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      // exclude the head
      snake.pop();
      snake.forEach(dot => {
        if (dot[0] == head[0] && dot[1] == head[1]) {
          this.onGameOver();
        }
      });
    }
  }

  randomKanjis(n) {
    let ret = [];
    for (let i = 0; i < n; i++) {
      ret.push(randomKanji(hanzis));
    }
    return ret;
  }

  onNextLevel() {
    // this.level += this.level === this.level.length - 1 ? 0 : 1;
    this.background = background[Math.floor(Math.random() * background.length)];
    this.onRestartGame();
  }

  onRestartGame() {
    this.obstacleFood = getRandomCoordinates(this.hanziCount);
    this.levelFood = getRandomCoordinates(1, this.obstacleFood);
    this.setState({
      score: 0,
      gameOver: false,
      show: false,
      levelKanji: randomKanji(this.level),
      kanji: randomKanji(hanzis),
      speed: 100,
      direction: "RIGHT",
      snakeDots: [
        [0, 0],
        [4, 0]
      ]
    });
  }

  onGameOver() {
    this.levelCount = 1;
    this.hanziCount = 2;
    if (!this.state.gameOver) {
      let audio = new Audio(require("../audio/SnakeGame/game-over.mp3"));
      audio.play();
      this.setState({ gameOver: true, show: true });
    }
  }

  handleCloseModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Container>
          <Modal
            show={this.state.show}
            onHide={this.handleCloseModal}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>Game over!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Total Score : {this.state.score}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger">
                <Link to={this.props.url} style={{ color: "white" }}>
                  Quit
                </Link>
              </Button>
              <Button
                variant="warning"
                onClick={this.onRestartGame}
                style={{ color: "white" }}
              >
                Restart
              </Button>
            </Modal.Footer>
          </Modal>

          <Row>
            <Col md={8}>
              <div
                style={{
                  fontFamily: "kaiTi",
                  display: "inline-block",
                  position: "relative",
                  width: 160 * 4,
                  height: 160 * 4,
                  border: "2px solid #000",
                  backgroundImage: `url(${this.props.background})`,
                  backgroundSize: `${160 * 4}px ${160 * 4}px`
                }}
              >
                <Snake
                  snakeDots={this.state.snakeDots}
                  snakeImgDirection={this.snakeImgDirection}
                />
                {this.levelFood.map((levelFood, i) => {
                  return (
                    <Food
                      key={i}
                      dot={levelFood}
                      kanji={this.state.levelKanji[0]}
                    />
                  );
                })}

                {this.obstacleFood.map((food, i) => {
                  return (
                    <Food key={i} dot={food} kanji={this.state.kanjiList[i]} />
                  );
                })}
              </div>
            </Col>

            <Col md={4}>
              <div className="container d-flex h-100">
                <div className="row justify-content-center align-self-center ">
                  <h1>Score : {this.state.score}</h1>
                  <Card className="shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                      <h1
                        style={{
                          fontSize: 130,
                          fontFamily: "kaiTi"
                        }}
                      >
                        {this.state.levelKanji[0]}
                      </h1>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SnakeGame;
