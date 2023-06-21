import React from "react";
import "../public/styles.css";

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <div className="gmc-container">
          <div className="GMC"></div>
        </div>
        <div className="verticalLine"></div>
        <div className="denali-container">
          <div className="DENALI"></div>
        </div>
      </div>
      <div className="horizontal-red-line"></div>
      <div className="ultimate-container">
        <div className="ULTIMATE"></div>
      </div>
    </div>
  );
}

export default Header;
