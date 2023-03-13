import React from "react";
import "./index.css";
import story from "../assets/story.png";
import { Link } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import Footer from "./Footer";

const Data = [
  {
    id: 1,
    avatar: "elephant",
    title: "Elephant and the Rope",
    story:{val:[
      "A man was walking nearby to a group of elephants that was halted by a small rope tied to their front leg.",
    
      "He was amazed by the fact that the huge elephants are not even making an attempt to break the rope and set themselves free.",
    
      "He saw an elephant trainer standing beside them and he expressed his puzzled state of mind.",
    
      "The trainer said “When they are very young and much smaller we use the same size rope to tie them and, at that age, it’s enough to hold them.",
    
      "As they grow up, they are conditioned to believe they cannot break away. They believe the rope can still hold them, so they never try to break free.",
    
      "Moral of the story: It is the false belief of the elephants that denied their freedom for a lifetime.",
    
      "Likewise, many people are not trying to work towards success in their life just because they failed once before.",
    
      "So keep on trying and don’t get tied up with some false beliefs of failure.",
      "The End! Check Result to find the Winner!!",
    ]}
     
  },
  {
    id: 2,
    avatar: "sweet_sour",
    title: "Sweet & Sour",
    story:{
      val:[
        "Why is sea water salty, It is salty because there is salt in the sea",
        "Why is the chocolate sweet, It is sweet because there is sugar in it",
        "Why is a lime sour, The acid in the lime makes it sour",
        "Is there salt in tears, Yes there is",
        "Is there sugar in a mango, Yes there is sugar in ripe mango",
        "Is there acid in curd, Yes there is some acid in curd"
      ]
    }
      
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
    localStorage.setItem("story", JSON.stringify(item.story));
    localStorage.setItem("index", item.id);
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
                index < 2
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
