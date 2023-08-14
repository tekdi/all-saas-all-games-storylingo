import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import turn1 from "../assets/turn1.png";
import turn2 from "../assets/turn2.png";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import newselection from "../assets/audio/selectplayer.mp3";
import Footer from "./Footer";
import { interactCall } from "../services/callTelemetryIntract";

const Data = [
  { id: 1, avatar: "p1", selected: "" },
  { id: 2, avatar: "p2", selected: "" },
  { id: 3, avatar: "p3", selected: "" },
  { id: 4, avatar: "p4", selected: "" },
];

function Avatar() {
  const [turn, selectTurn] = useState(0);
  const [avatarData, setAvatar] = useState(Data);
  const [switchVal, setSwitch] = useState(false);
  let numberOfPlayers = localStorage.getItem("players");
  console.log("number of players", numberOfPlayers);
  useEffect(() => {
    console.log("comig here");
    setAvatar([
      { id: 1, avatar: "p1", selected: "" },
      { id: 2, avatar: "p2", selected: "" },
      { id: 3, avatar: "p3", selected: "" },
      { id: 4, avatar: "p4", selected: "" },
    ]);
  }, []);

  const selectPlayer = (id) => {
    let temp = avatarData.find((item) => item.id === id);
    let playerClicked = new Audio(newselection);
    playerClicked.play();
    if (numberOfPlayers === "p1s") {
      avatarData.forEach((item, index) => (avatarData[index].selected = ""));
      temp.selected = "pt1";
      selectTurn(1);
      setSwitch(!switchVal);
      localStorage.setItem("p1", temp.avatar);
      setAvatar(avatarData);
      return;
    }
    if (turn === 0) {
      temp.selected = "pt1";
      selectTurn(1);
      localStorage.setItem("p1", temp.avatar);
      setAvatar(avatarData);
    } else {
      if (temp.selected === "" && turn !== 2) {
        temp.selected = "pt2";
        selectTurn(2);
        setAvatar(avatarData);
        localStorage.setItem("p2", temp.avatar);
      }
    }
  };
  console.log("checking avatardata", turn, numberOfPlayers);
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
          src={avatar}
          className="avatar-heading"
          height="70px"
          alt="avatar"
          style={
            window.screen.width > 767
              ? { marginTop: "20px" }
              : { marginTop: "60px" }
          }
        />
      </div>
      <div>
        {numberOfPlayers === "p1s" ? (
          <img src={turn1} height="45px" alt="turn1" />
        ) : turn === 0 ? (
          <img src={turn1} height="45px" alt="turn1" />
        ) : (
          <img src={turn2} height="45px" alt="turn2" />
        )}
      </div>
      <div className="grid-av">
        {avatarData.map((item) => {
          return (
            <div key={item.id} className="grid-item-av">
              <div
                onClick={() => {
                  interactCall("DT");
                  selectPlayer(item.id);
                }}
              >
                <img
                  height="120px"
                  width="auto"
                  style={
                    item.selected
                      ? {
                          borderRadius: "50%",
                          border: "3px solid yellow",
                          transform: "scale(1.1)",
                        }
                      : { borderRadius: "50%" }
                  }
                  src={require(`../assets/${item.avatar}.png`)}
                  alt={item.avatar}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                {item.selected && (
                  <img
                    height="15px"
                    width="auto"
                    src={require(`../assets/${item.selected}.png`)}
                    alt={item.selected}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Link to="/play" style={{ textDecoration: "none" }}>
          {(turn === 2 || (numberOfPlayers === "p1s" && turn === 1)) && (
            <div className="btn">
              <div className="btn-play">
                <img
                  height="10px"
                  width="auto"
                  src={require(`../assets/play.png`)}
                  alt={"play"}
                />
              </div>
              <img
                height="12px"
                width="auto"
                src={require(`../assets/start.png`)}
                alt={"start"}
              />
            </div>
          )}
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Avatar;
