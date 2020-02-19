import React from "react";

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SnakeGame from "../../pages/SnakeGame";

class SubLevel extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={`/snake-game-level-${this.props.index}`}>
            <Container>
              <Row>
                <Col>
                  {this.props.level.map((level, i) => {
                    return (
                      <Card
                        className="shadow bg-white rounded"
                        style={{
                          margin: 20,
                          textAlign: "center",
                          width: 200,
                          display: "inline-block"
                        }}
                      >
                        <Card.Img src={this.props.level[i][1]}></Card.Img>
                        <Card.Title>{this.props.level[i][0]}</Card.Title>
                        <Card.Body>
                          <Button variant="info">
                            <Link
                              style={{ color: "white" }}
                              to={`/snake-game-level-${this.props.index}-${this.props.level[i][0]}`}
                            >
                              Enter
                            </Link>
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Col>
              </Row>
            </Container>
          </Route>

          {this.props.level.map((level, i) => {
            return (
              <Route
                path={`/snake-game-level-${this.props.index}-${this.props.level[i][0]}`}
              >
                <SnakeGame
                  path={`/snake-game-level-${this.props.index}`}
                  level={this.props.level[i][2]}
                />
              </Route>
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default SubLevel;
