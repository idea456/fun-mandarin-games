import React from "react";

const Food = props => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  };
  return (
    <div>
      <img
        src={require("../../images/SnakeGame/food.png")}
        width={60}
        style={{
          left: `${props.dot[0] - 3}%`,
          top: `${props.dot[1] - 3}%`,
          position: "absolute",
          zIndex: 0
        }}
      />
      <div className="snake-food" style={style}>
        {props.kanji}
      </div>
    </div>
  );
};

export default Food;
