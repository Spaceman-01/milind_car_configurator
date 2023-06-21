import React, { useRef, useState, useEffect } from "react";
import "../public/styles.css";

function Footer(props) {
  const [selectedItem, setSelectedItem] = useState("interact");

  function handleClick(buttonName) {
    setSelectedItem(buttonName);
  }

  const renderContent = (button) => {
    if (selectedItem === button) {
      return <div className="horizontal-red-line-in-text-box"></div>;
    }
    return null;
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div
          onClick={() => {
            handleClick("interact");
          }}
          id="interact"
          className="text-box"
          style={{
            fontWeight: selectedItem === "interact" ? "bold" : "normal",
          }}
        >
          <p>INTERACT</p>
          {renderContent("interact")}
        </div>
        <div className="vertical-red-line"></div>
        <div
          onClick={() => {
            handleClick("features");
          }}
          id="features"
          className="text-box"
          style={{
            fontWeight: selectedItem === "features" ? "bold" : "normal",
          }}
        >
          <p>FEATURES</p>
          {renderContent("features")}
        </div>
        <div className="vertical-red-line"></div>
        <div
          onClick={() => {
            handleClick("accesories");
          }}
          id="accesories"
          className="text-box"
          style={{
            fontWeight: selectedItem === "accesories" ? "bold" : "normal",
          }}
        >
          <p>ACCESORIES</p>
          {renderContent("accesories")}
        </div>
        <div className="vertical-red-line"></div>
        <div
          onClick={() => {
            handleClick("summary");
          }}
          id="summary"
          className="text-box"
          style={{
            fontWeight: selectedItem === "summary" ? "bold" : "normal",
          }}
        >
          <p>SUMMARY</p>
          {renderContent("summary")}
        </div>
      </div>
    </div>
  );
}

export default Footer;
