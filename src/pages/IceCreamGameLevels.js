import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { levels, levelsAssets } from "../data/IceCreamGame/IceCreamGame";
import Level from "../components/IceCreamGame/Level";
import SubLevel from "../components/IceCreamGame/SubLevel";
import App from "../App";

function IceCreamGameLevels(props) {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Container>
            <Row>
              <Col>
                {levelsAssets.map((level, i) => {
                  return (
                    <Level
                      key={i}
                      index={i}
                      title={level[0]}
                      backgroundImg={level[1]}
                    />
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
                      <Link style={{ color: "white" }} to="/">
                        Back
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Route>

        <Route path={`${path}/:levelId`} component={SubLevel} />
      </Switch>
    </div>
  );
}

export default IceCreamGameLevels;
