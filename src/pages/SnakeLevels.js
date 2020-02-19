import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { levels, levelsAssets } from "../data/SnakeGame/SnakeGame";
import SnakeGame from "../pages/SnakeGame";
import Level from "../components/SnakeGame/Level";
import SubLevel from "../components/SnakeGame/SubLevel";

class SnakeLevels extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/snake-levels">
            <Container>
              <Row>
                <Col>
                  {levels.map((level, i) => {
                    return (
                      <Level
                        key={i}
                        index={i}
                        title={levelsAssets[i][0]}
                        backgroundImg={levelsAssets[i][1]}
                      />
                    );
                  })}
                </Col>
              </Row>
            </Container>
          </Route>

          {levels.map((level, i) => {
            return (
              <Route path={`/snake-game-level-${i}`}>
                <SubLevel key={i} index={i} level={level} />
              </Route>
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default SnakeLevels;
