import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import SnakeLevels from "./pages/SnakeLevels";
import SpaceInvaders from "./pages/SpaceInvaders";
import IceCreamGame from "./pages/IceCreamGame";

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
                <Link to="/ice-cream-game" style={{ color: "white" }}>
                  Ice Cream
                </Link>
              </Button>
              <Button variant="primary" size="lg">
                <Link to="/space-invaders" style={{ color: "white" }}>
                  Space Invaders
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </Route>
        <Route path="/snake-levels">
          <SnakeLevels />
        </Route>

        <Route path="/ice-cream-game">
          <IceCreamGame />
        </Route>

        <Route path="/space-invaders">
          <SpaceInvaders />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
