import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="footer1">
        Powered by
        <img
          src={require(`../assets/sunbirdlogo.png`)}
          className="logo-img"
          alt="logo"
        />
        <img
          src={require(`../assets/sunbird.png`)}
          className="logo-img"
          alt="sunbird"
          style={{ padding: 0, height: "17px" }}
        />
      </div>
      <div className="footer2">
        Created with
        <img
          src={require(`../assets/love.png`)}
          alt="love"
          className="logo-img"
        />{" "}
        by
        <a href="https://www.netskill.com" target="_blank">
          <img
            src={require(`../assets/netskill.png`)}
            alt="netskill"
            className="logo-img"
          />
        </a>
      </div>
    </div>
  );
}
