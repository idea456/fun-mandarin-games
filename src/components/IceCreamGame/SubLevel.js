import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { levels } from "../../data/IceCreamGame/IceCreamGame";

import IceCreamGame from "../../pages/IceCreamGame";
import IceCreamGameLevels from "../../pages/IceCreamGameLevels";

function SubLevel(props) {
  let { levelId } = useParams();
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Container>
          <Row>
            <Col>
              {levels[levelId].map(level => {
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
                    <Card.Img src={level[1]}></Card.Img>
                    <Card.Title>{level[0]}</Card.Title>
                    <Card.Body>
                      <Button variant="info">
                        <Link
                          style={{ color: "white" }}
                          to={`${url}/${level[0]}`}
                        >
                          Enter
                        </Link>
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
              <Card
                style={{
                  border: "none",
                  textAlign: "center"
                }}
              >
                <Card.Body>
                  <Button variant="danger">
                    <Link style={{ color: "white" }} to="/ice-cream-levels">
                      Back
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Route>

      <Route
        path={`/ice-cream-levels/:levelId/:levelName`}
        component={IceCreamGame}
      />

      <Route path="/ice-cream-levels" component={IceCreamGameLevels} />
    </Switch>
  );
}

function Hello() {
  let { levelId, levelName } = useParams();
  return (
    <h1>
      Hello {levelName} from {levelId}
    </h1>
  );
}

export default SubLevel;
