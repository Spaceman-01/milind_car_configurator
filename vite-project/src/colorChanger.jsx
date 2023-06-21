import React from "react";
import "../public/styles.css";

function ColorChanger(props) {
  function handelClick(e) {
    let colour = e.target.getAttribute("name");
    props.selectedColor(colour);
  }

  return (
    <div>
      <div id="color-changer">
        <div className="color-box-container">
          <div
            onClick={handelClick}
            className="color-box color-1"
            name="#C41E3A"
          ></div>
          <div
            onClick={handelClick}
            className="color-box color-2"
            name="#009DC4"
          ></div>
          <div
            onClick={handelClick}
            className="color-box color-3"
            name="#A09E9C"
          ></div>
        </div>
        <div id="red-bar-in-color-changer"></div>
      </div>
    </div>
  );
}

export default ColorChanger;
