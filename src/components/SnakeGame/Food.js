import React from "react";

const Food = props => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  };
  if (props.kanji.length > 1) {
    return (
      <div>
        <img
          src={require("../../images/SnakeGame/cloud1.png")}
          width={130}
          style={{
            left: `${props.dot[0] - 5}%`,
            top: `${props.dot[1] - 3}%`,
            position: "absolute",
            zIndex: 0
          }}
        />
        <div className="snake-food" style={style}>
          <span style={{ whiteSpace: "nowrap" }}>{props.kanji}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <img
          src={require("../../images/SnakeGame/cloud1.png")}
          width={80}
          style={{
            left: `${props.dot[0] - 4}%`,
            top: `${props.dot[1]}%`,
            position: "absolute",
            zIndex: 0
          }}
        />
        <div className="snake-food" style={style}>
          {props.kanji}
        </div>
      </div>
    );
  }
};

export default Food;
