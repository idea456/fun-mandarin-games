import React from "react";

const Snake = props => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const styleTail = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          backgroundColor: "transparent"
        };
        const styleHead = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          backgroundColor: "transparent"
        };
        if (i === props.snakeDots.length - 1) {
          return (
            <div className="snake-dot" key={i} style={styleHead}>
              <img
                style={{ width: 23, height: 23 }}
                src={props.snakeImgDirection()}
              />
            </div>
          );
        } else {
          return (
            <div className="snake-dot" key={i} style={styleTail}>
              <img
                style={{ width: 23, height: 23 }}
                src={require("../../images/SnakeGame/snake-body.png")}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Snake;
