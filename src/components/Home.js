import React from "react";
import "./index.css";
import story from "../assets/story.png";
import selectstory from "../assets/audio/selectstory.mp3";
import { Link } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import Footer from "./Footer";

const Data = [
  {
    id: 1,
    avatar: "elephant",
    title: "ELEPHANT & THE ROPE",
    story:
      "Once upon a time, in a meadow filled with wildflowers, there lived a beautiful butterfly named Bella. Bella was known throughout the meadow for her unique smile, which sparkled and shone like the sun.",
  },
  {
    id: 2,
    avatar: "banana",
    title: "TOO MANY BANANAS",
    story:
      "Once upon a time, in a small village, there was a family who owned a banana farm. They had been growing bananas for generations and were known for producing the sweetest and most delicious bananas in the region.",
  },
  {
    id: 3,
    avatar: "singing",
    title: "SINGING IN THE RAIN",
    story:
      "It was a rainy day, but Sarah did not let the weather dampen her spirits. She loved the rain and the sound it made as it pattered against the pavement.",
  },
  {
    id: 4,
    avatar: "found",
    title: "LOST AND FOUND",
    story:
      "Sophie was a little girl who loved to explore. She lived in a small town with her parents, and she would often wander off into the woods behind their house, looking for adventure.",
  },
  {
    id: 5,
    avatar: "satya",
    title: "SATYA, WATCH OUT!",
    story:
      "Satya was a young boy who loved to explore the forest near his village. He often went out alone, taking in the sights and sounds of the natural world around him.",
  },
  {
    id: 6,
    avatar: "helping",
    title: "A HELPING HAND",
    story:
      "Sophie was walking home from school when she noticed an elderly woman struggling with her groceries. The woman was walking with a cane and had several heavy bags in her arms.",
  },
];

function Home() {
  function storySelect(item) {
    localStorage.setItem("story", item.story);
    localStorage.setItem("audio", item.avatar);
    let storyPlay = new Audio(selectstory);
    storyPlay.play();
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
        <Link to='/'>
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
          src={story}
          height="70px"
          alt="story"
          style={window.screen.width>767?{ marginTop: "20px" }:{marginTop:'60px'}}
        />
      </div>
      <div className="grid">
        {Data.map((item, index) => {
          return (
            <Link
              to="/player"
              style={
                index === 0
                  ? { textDecoration: "none" }
                  : {
                    textDecoration: "none",
                    opacity: 0.3,
                    pointerEvents: "none",
                  }
              }
              key={item.id}
            >
              <div
                key={item.id}
                className="grid-item"
                onClick={() => {
                  storySelect(item);
                }}
              >
                <div>
                  <img
                    height="150px"
                    width="auto"
                    style={{ borderRadius: "24px 24px 0 0" }}
                    src={require(`../assets/${item.avatar}.png`)}
                    alt={item.avatar}
                  />
                </div>
                <div className="title">{item.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
     {/* <Footer /> */}
    </div>
  );
}

export default Home;
