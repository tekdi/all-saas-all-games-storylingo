import React, { useState } from "react";
import "./index.css";
import mode from "../assets/mode.png";
import p1u from "../assets/p1u.png";
import p2u from "../assets/p2u.png";
import p1s from "../assets/p1s.png";
import p2s from "../assets/p2s.png";
import next from "../assets/next.png";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import newselection from "../assets/audio/selectplayer.mp3";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { interactCall } from "../services/callTelemetryIntract";

function Player() {
  const [current, setCurrent] = useState("");
  function setPlayers(item) {
    setCurrent(item);
    localStorage.setItem("players", item);
    let playerClicked = new Audio(newselection);
    playerClicked.play();
  }

  return (
    <div className="main-container">
      <div className="top-header">
        <img
          src={logo}
          height="25px"
          alt="logo"
          style={{ cursor: "pointer" }}
        />
        <Link to="/">
          <img
            src={homeicon}
            height="25px"
            alt="homeicon"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
      <div>
        <img
          src={mode}
          height="70px"
          alt="story"
          style={
            window.screen.width > 767
              ? { marginTop: "20px" }
              : { marginTop: "60px" }
          }
        />
      </div>
      <div className="player-container">
        <img
          src={current === "p1s" ? p1s : p1u}
          height="55px"
          width="255px"
          alt="player1"
          style={{ cursor: "pointer", marginBottom: "30px" }}
          onClick={() => {
            interactCall("DT");
            setPlayers("p1s");
          }}
        />
        <img
          src={current === "p2s" ? p2s : p2u}
          height="55px"
          width="255px"
          alt="player2"
          style={{ cursor: "pointer" }}
          onClick={() => {
            interactCall("DT");
            setPlayers("p2s");
          }}
        />
      </div>
      <div className="footerNext">
        <Link to="/avatar">
          <img
            src={next}
            height="30px"
            alt="player2"
            style={
              current
                ? { cursor: "pointer" }
                : { opacity: 0.3, pointerEvents: "none" }
            }
            onClick={() => {
              interactCall("DT");
              setPlayers(current);
            }}
          />
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Player;
