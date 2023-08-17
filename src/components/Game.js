import React, { useState, useEffect, useLayoutEffect } from "react";
import playerTitle from "../assets/gt1.png";
import playerTitle2 from "../assets/turn2.png";
import coin from "../assets/audio/coin.mp3";
import result from "../assets/checkresult.png";
import { Link } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import VoiceAnalyser from "../utility/VoiceAnalyser";
import SoundWave from "../utility/SoundWave";

// const Story =[
//   "A man was walking nearby to a group of elephants that was halted by a small rope tied to their front leg.",

//   "He was amazed by the fact that the huge elephants are not even making an attempt to break the rope and set themselves free.",

//   "He saw an elephant trainer standing beside them and he expressed his puzzled state of mind.",

//   "The trainer said “When they are very young and much smaller we use the same size rope to tie them and, at that age, it’s enough to hold them.",

//   "As they grow up, they are conditioned to believe they cannot break away. They believe the rope can still hold them, so they never try to break free.",

//   "Moral of the story: It is the false belief of the elephants that denied their freedom for a lifetime.",

//   "Likewise, many people are not trying to work towards success in their life just because they failed once before.",

//   "So keep on trying and don’t get tied up with some false beliefs of failure.",
//   "The End! Check Result to find the Winner!!",
// ];

function Game() {
  const [recordedAudio, setRecordedAudio] = useState("");
  const [Story, setStory] = useState([]);
  const [voiceText, setVoiceText] = useState("");
  const [currentIndex,setCurrentIndex] = useState(0);
  // const [newtextresult, setnewtextresult] = useState('');
  // const [voiceTextHighlight, setVoiceTextHighLight] = useState('');
  const initiateValues = async () => {
    const currIndex = await localStorage.getItem("index");
    setCurrentIndex(currIndex);
    const temp = await localStorage.getItem("story");

    let story = JSON.parse(temp)?.val;
    setStory(story);
    // console.log("fd", story, temp);
  };
  useLayoutEffect(() => {
    initiateValues();
  }, []);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [storyLine, setStoryLine] = useState(0);
  const [voiceAnimate, setVoiceAnimate] = useState(false);
  // const [fluencyResult, setfluencyresult] = useState('');
  let player1 = localStorage.getItem("p1");
  let player2 = localStorage.getItem("p2");
  let numberOfPlayers = localStorage.getItem("players");

  function go_to_result(voiceText) {
    console.log("gotoResult");
    localStorage.setItem("contentText", Story[storyLine]);
    localStorage.setItem("recordedAudio", recordedAudio);
    localStorage.setItem("voiceText", voiceText);
    localStorage.setItem("contentid", 3);
    localStorage.setItem("contenttype", "Paragraph");
    localStorage.setItem("isfromresult", "learn");
    checkVoice(voiceText, Story[storyLine]);
  }

  function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  function checkVoice(voiceText, teacherText) {
    let tempteacherText = teacherText.toLowerCase();
    tempteacherText = replaceAll(tempteacherText, ".", "");
    tempteacherText = replaceAll(tempteacherText, "'", "");
    tempteacherText = replaceAll(tempteacherText, ",", "");
    tempteacherText = replaceAll(tempteacherText, "!", "");
    tempteacherText = replaceAll(tempteacherText, "|", "");
    let texttemp = voiceText.toLowerCase();
    const studentTextArray = texttemp.split(" ");
    const teacherTextArray = tempteacherText.split(" ");
    let student_text_result = [];
    let originalwords = teacherTextArray.length;
    let studentswords = studentTextArray.length;
    let correct_words = 0;
    let result_per_words = 0;
    for (let i = 0; i < studentTextArray.length; i++) {
      if (teacherTextArray.includes(studentTextArray[i])) {
        correct_words++;
        student_text_result.push(studentTextArray[i]);
      } else {
        student_text_result.push(studentTextArray[i]);
      }
    }
    // setVoiceTextHighLight(student_text_result);
    //calculation method
    if (originalwords >= studentswords) {
      result_per_words = Math.round(
        Number((correct_words / originalwords) * 100)
      );
    } else {
      result_per_words = Math.round(
        Number((correct_words / studentswords) * 100)
      );
    }
    if (storyLine % 2 === 0 || numberOfPlayers === "p1s") {
      let temp = player1Score + result_per_words;
      setPlayer1Score(temp);
      localStorage.setItem("score1", temp);
    }
    if (storyLine % 2 === 1 && numberOfPlayers !== "p1s") {
      let temp = player2Score + result_per_words;
      setPlayer2Score(temp);
      localStorage.setItem("score2", temp);
    }
    let temp = storyLine + 1;
    setStoryLine(temp);
    let coinAudio = new Audio(coin);
    if (coinAudio !== null) {
      coinAudio.play();
    }
    //fluencytestresult
    // if (result_per_words < 45) {
    //   setnewtextresult('Oops.. but you tried well!');
    //   setfluencyresult('Needs to work on fluency');
    // } else if (result_per_words >= 45 && result_per_words <= 75) {
    //   setnewtextresult('Yay ! You got it almost right !');
    //   setfluencyresult('Good scope to improve fluency');
    // } else {
    //   setnewtextresult('Yay ! You got it right !');
    //   setfluencyresult('You have good level of fluency');
    // }
  }
  useEffect(() => {
    if (voiceText === "-") {
      alert("Sorry I couldn't hear a voice. Could you please speak again?");
      setVoiceText("");
    }
    if ((voiceText !== "") & (voiceText !== "-")) {
      go_to_result(voiceText);
    }
    //eslint-disable-next-line
  }, [voiceText]);

  console.log("check stoy line", storyLine);

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
        {storyLine <= Story.length - 1 && (
          <img
            src={
              numberOfPlayers === "p1s"
                ? playerTitle
                : storyLine % 2 === 0
                ? playerTitle
                : playerTitle2
            }
            height="60px"
            alt="player1"
            style={window.screen.width < 767 ? { marginTop: "50px" } : {}}
            className="playPlayerTitle"
          />
        )}
      </div>
      <div
        className="play-grid"
        style={
          storyLine <= Story.length - 1
            ? {}
            : {
                gridTemplateColumns: "none",
                height: "70vh",
                alignItems: "center",
              }
        }
      >
        {storyLine <= Story.length - 1 && (
          <div
            className="progress desktop-progress"
            style={
              storyLine % 2 === 1 && numberOfPlayers !== "p1s"
                ? { opacity: 0.3 }
                : {}
            }
          >
            <div>
              <img
                height="65px"
                src={require(`../assets/trophy.png`)}
                alt="trophy"
              />
            </div>
            <div className="barcontainer">
              <div
                className="bar"
                style={
                  numberOfPlayers === "p1s"
                    ? { height: `${player1Score / Story.length}%` }
                    : { height: `${player1Score / (Story.length / 2)}%` }
                }
              ></div>
            </div>
            <div>
              <img
                height="65px"
                src={require(`../assets/${player1}.png`)}
                alt="p1"
              />
            </div>
            <div>
              <img
                height="13px"
                style={{ marginTop: "5px" }}
                src={require(`../assets/pt1.png`)}
                alt="pt1"
              />
            </div>
            <div style={{ color: "yellow", fontSize: "12px", fontWeight: 600 }}>
              {player1Score}
            </div>
          </div>
        )}
        <div className="read">
          <img
            src={
              storyLine <= Story.length - 1
                ? require(`../assets/story${currentIndex}${storyLine}.png`)
                : require(`../assets/over.png`)
            }
            className={
              storyLine <= Story.length - 1 ? "read-img" : "read-img-over"
            }
            alt="read"
            // style={storyLine <8  && window.screen.width>767? { height: "170px" } : {height:"90px !important" }}
          />
          {/* <div className='story-txt'> {Story[storyLine]}</div> */}
          {voiceAnimate && (
            <div style={{ position: "relative", bottom: "25%" }}>
              <SoundWave />
            </div>
          )}
        </div>
        {storyLine <= Story.length - 1 && numberOfPlayers !== "p1s" && (
          <div
            className="desktop-progress"
            style={
              storyLine % 2 === 0
                ? {
                    opacity: 0.3,
                    textAlign: "right",
                    width: "91px",
                    margin: "0 0 0 auto",
                  }
                : { textAlign: "right", width: "91px", margin: "0 0 0 auto" }
            }
          >
            <div>
              <img
                style={{ paddingRight: "10px" }}
                height="65px"
                src={require(`../assets/trophy.png`)}
                alt="trophy"
              />
            </div>
            <div>
              <div className="barcontainer2">
                <div
                  className="bar2"
                  style={{ height: `${player2Score / 4}%` }}
                ></div>
              </div>
            </div>

            <div>
              <img
                height="65px"
                src={require(`../assets/${player2}.png`)}
                alt="p2"
              />
            </div>
            <div>
              <img
                height="14px"
                style={{ marginTop: "5px" }}
                src={require(`../assets/pt2.png`)}
                alt="pt2"
              />
            </div>
            <div
              style={{
                color: "yellow",
                width: "50px",
                margin: "0 0 0 auto",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {player2Score}
            </div>
          </div>
        )}
      </div>

      <div className="play-grid-mobile">
        {storyLine <= Story.length - 1 && (
          <div
            style={{
              opacity:
                storyLine % 2 === 1 && numberOfPlayers !== "p1s" ? "0.3" : "1",
            }}
            className="mobile-bar-container"
          >
            <div>
              <img
                height="65px"
                src={require(`../assets/${player1}.png`)}
                alt="p1"
              />
              <div>
                <img
                  height="13px"
                  style={{ marginTop: "5px" }}
                  src={require(`../assets/pt1.png`)}
                  alt="pt1"
                />
              </div>
              <div
                style={{ color: "yellow", fontSize: "12px", fontWeight: 600 }}
              >
                {player1Score}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img
                // height="13px"
                style={{ marginTop: "10px", position: "relative" }}
                src={require("../assets/mobileGameBar.svg").default}
                alt="mobileBar"
              />
              <div
                className="mobile-game-bar"
                style={
                  numberOfPlayers === "p1s"
                    ? { width: `${player1Score / Story.length}%` }
                    : { width: `${player1Score / (Story.length / 2)}%` }
                }
              ></div>
            </div>
            <div>
              <img
                style={{ marginTop: "10px" }}
                height="65px"
                src={require(`../assets/trophy.png`)}
                alt="trophy"
              />
            </div>
          </div>
        )}
        {storyLine <= Story.length - 1 && numberOfPlayers !== "p1s" && (
          <div
            style={{
              opacity: storyLine % 2 === 0 ? "0.3" : "1",
            }}
            className="mobile-bar-container"
          >
            <div>
              <img
                height="65px"
                src={require(`../assets/${player2}.png`)}
                alt="p1"
              />
              <div>
                <img
                  height="13px"
                  style={{ marginTop: "5px" }}
                  src={require(`../assets/pt2.png`)}
                  alt="pt1"
                />
              </div>
              <div
                style={{ color: "yellow", fontSize: "12px", fontWeight: 600 }}
              >
                {player2Score}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img
                // height="13px"
                style={{ marginTop: "10px", position: "relative" }}
                src={require("../assets/mobileGameBar.svg").default}
                alt="mobileBar"
              />
              <div
                className="mobile-game-bar"
                style={{ width: `${player2Score / 4}%` }}
              ></div>
            </div>
            <div>
              <img
                style={{ marginTop: "10px" }}
                height="65px"
                src={require(`../assets/trophy.png`)}
                alt="trophy"
              />
            </div>
          </div>
        )}
      </div>
      {/* <Link to='/result' style={{textDecoration:'none'}}> */}
      <div>
        {storyLine > Story.length - 1 ? (
          <Link to="/result" style={{ textDecoration: "none" }}>
            <div className="btn-result" style={{ right: 0 }}>
              <img height="30px" width="auto" src={result} alt={"home"} />
            </div>
          </Link>
        ) : (
          <VoiceAnalyser
            setVoiceText={setVoiceText}
            setRecordedAudio={setRecordedAudio}
            setVoiceAnimate={setVoiceAnimate}
            storyLine={storyLine}
            // updateStory={updateStory}
          />
        )}
      </div>
      {/* </Link> */}
    </div>
  );
}

export default Game;
