import React from "react";
import "../styles/SnakeGame.css";

import Snake from "../components/SnakeGame/Snake";
import Food from "../components/SnakeGame/Food";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

let kanjis = ["月", "日", "木", "水", "火", "金"];

let animalList = [
  ["狗", require("../audio/SnakeGame/狗.mp3")],
  ["牛", require("../audio/SnakeGame/牛.mp3")],
  ["虎", require("../audio/SnakeGame/虎.mp3")],
  ["蛇", require("../audio/SnakeGame/蛇.mp3")],
  ["马", require("../audio/SnakeGame/马.mp3")],
  ["羊", require("../audio/SnakeGame/羊.mp3")],
  ["猴", require("../audio/SnakeGame/猴.mp3")],
  ["猪", require("../audio/SnakeGame/猪.mp3")]
];

let background = [
  'url("../images/SnakeGame/background.jpg")',
  'url("../images/SnakeGame/background2.jpg")',
  'url("../images/SnakeGame/background3.jpg")'
];

const getRandomCoordinates = (n = 1) => {
  let min = 1;
  let max = 40;
  let ret = [];
  for (let i = 0; i < n; i++) {
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 4;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 4;
    // check for any similar coordinates and delete them to avoid overlapping the hanzis
    let check = true;
    while (check) {
      for (let j = 0; j < ret.length; j++) {
        if ((x === ret[j][0] && y === ret[j][1]) || x === 0 || y === 0) {
          x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 4;
          y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 4;
          continue;
        }
      }
      check = false;
    }

    ret.push([x, y]);
  }

  return ret;
};

const randomKanji = list => {
  let index = Math.floor(Math.random() * list.length);
  return list[index];
};

class SnakeGame extends React.Component {
  constructor() {
    super();
    this.animalCount = 1;
    this.hanziCount = 2;
    this.state = {
      gameOver: false,
      show: false,
      score: 0,
      food: getRandomCoordinates(this.hanziCount),
      animalFood: getRandomCoordinates(this.animalCount),
      kanji: randomKanji(kanjis),
      kanjiList: this.randomKanjis(4),
      animalKanji: randomKanji(animalList),
      speed: 150,
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
    for (let i = 0; i < this.state.food.length; i++) {
      let food = this.state.food[i];
      if (head[0] === food[0] && head[1] === food[1]) {
        // collision detected between 'obstacles' food!
        this.hanziCount -= this.hanziCount === 2 ? 0 : 1;
        let audio = new Audio(require("../audio/SnakeGame/wrong.mp3"));
        audio.play();
        this.setState({
          score: this.state.score - (this.state.score === 0 ? 0 : 1),
          food: getRandomCoordinates(this.hanziCount),
          animalFood: getRandomCoordinates(this.animalCount),
          kanji: randomKanji(kanjis),
          kanjiList: this.randomKanjis(this.hanziCount),
          animalKanji: randomKanji(animalList)
        });
        // check if the snake has shrunk too low
        if (this.state.snakeDots.length === 2) {
          this.onGameOver();
        } else {
          this.reduceSnake();
        }
      }
    }
    for (let i = 0; i < this.state.animalFood.length; i++) {
      let animalFood = this.state.animalFood[i];
      if (head[0] === animalFood[0] && head[1] === animalFood[1]) {
        this.hanziCount += this.hanziCount === 5 ? 0 : 1;
        let audio = new Audio(this.state.animalKanji[1]);
        audio.play();
        this.setState({
          score: this.state.score + 1,
          food: getRandomCoordinates(this.hanziCount),
          animalFood: getRandomCoordinates(this.animalCount),
          kanji: randomKanji(kanjis),
          kanjiList: this.randomKanjis(this.hanziCount),
          animalKanji: randomKanji(animalList)
        });
        this.enlargeSnake();
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
      ret.push(randomKanji(kanjis));
    }
    return ret;
  }

  onRestartGame() {
    this.setState({
      score: 0,
      gameOver: false,
      show: false,
      food: getRandomCoordinates(this.hanziCount),
      animalFood: getRandomCoordinates(this.animalCount),
      kanji: randomKanji(kanjis),
      speed: 100,
      direction: "RIGHT",
      snakeDots: [
        [0, 0],
        [4, 0]
      ]
    });
  }

  onGameOver() {
    this.animalCount = 1;
    this.hanziCount = 2;
    if (!this.state.gameOver) {
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
          <Modal show={this.state.show} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Game over</Modal.Title>
            </Modal.Header>
            <Modal.Body>Score : {this.state.score}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Quit</Button>
              <Button variant="primary" onClick={this.onRestartGame}>
                Restart
              </Button>
            </Modal.Footer>
          </Modal>

          <Row>
            <Col md={8}>
              <div
                className="game-area"
                styles={{
                  backgroundImage: 'url("../images/SnakeGame/background3.jpg")'
                }}
              >
                <Snake
                  snakeDots={this.state.snakeDots}
                  snakeImgDirection={this.snakeImgDirection}
                />
                {this.state.animalFood.map((animalFood, i) => {
                  return (
                    <Food
                      key={i}
                      dot={animalFood}
                      kanji={this.state.animalKanji[0]}
                    />
                  );
                })}

                {this.state.food.map((food, i) => {
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
                      <h1 style={{ fontSize: 190, fontFamily: "kaiTi" }}>
                        {this.state.animalKanji[0]}
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
