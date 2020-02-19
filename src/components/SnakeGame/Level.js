import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Level extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        <Card.Img
          style={{ width: 200 }}
          src={this.props.backgroundImg}
        ></Card.Img>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Body>
          <Button variant="info">
            <Link
              style={{ color: "white" }}
              to={`/snake-game-level-${this.props.index}`}
            >
              Enter
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Level;
