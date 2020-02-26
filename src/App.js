import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import SnakeLevels from "./pages/SnakeLevels";
import SpaceInvadersLevels from "./pages/SpaceInvadersLevels";
import IceCreamGameLevels from "./pages/IceCreamGameLevels";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <h1>Fun Mandarin</h1>
            <ButtonGroup vertical>
              <Button variant="danger" size="lg">
                <Link to="/snake-levels" style={{ color: "white" }}>
                  Snake Game
                </Link>
              </Button>
              <Button variant="warning" size="lg">
                <Link to="/ice-cream-levels" style={{ color: "white" }}>
                  Ice Cream
                </Link>
              </Button>
              <Button variant="primary" size="lg">
                <Link to="/space-invaders-levels" style={{ color: "white" }}>
                  Space Invaders
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </Route>
        <Route path="/snake-levels">
          <SnakeLevels />
          {/* <SnakeGame2 /> */}
        </Route>

        <Route path="/ice-cream-levels">
          <IceCreamGameLevels />
        </Route>

        <Route path="/space-invaders-levels">
          <SpaceInvadersLevels />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
