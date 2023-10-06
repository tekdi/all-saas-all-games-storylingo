import React from "react";
import "./index.css";
import story from "../assets/story.png";
import { Link } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import logo from "../assets/logo.png";
import Footer from "./Footer";
import { interactCall } from "../services/callTelemetryIntract";

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
    
      "So keep on trying and don’t get tied up with some false beliefs of failure."
    ]},
    lang:'en'
     
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
    },
    lang:'en'
      
  },
  {
    id: 3,
    avatar: "satya",
    title: "SATYA, WATCH OUT!",
    story: {val:[
      "SATYA, WATCH OUT!",
      "Satya can’t stay still. He runs and jumps and spins and rolls and falls!",
      "'Sit quietly for a minute!' says Appa. 'If you get hurt, don’t come crying to me, ' says Akka.",
      "'Don’t you dare break anything!' says Thaatha. 'You're disturbing the class,' says his teacher.",
      "But what can Satya do if his hands and legs are always dancing?",
      "Today is Sunday. It’s Satya’s favourite day of the week — the day he goes to the farm where Amma works.",
      "It’s a long walk to the farm, through secret up-and-down paths, open fields, thick forests and gently flowing streams.",
      "Satya hops like a hare and sprints like a deer.'The mud is squishy. Be careful!' says Amma.",
      "He crawls like a centipede and slithers like a snake. 'Look out for thorns!' says Amma.",
      "He swings like a spider and leaps like a langur. 'Wheeeee!' 'Use the strong branches, my little monkey,' says Amma.",
      "He paddles like a duck and swims like a frog. 'Stay in the shallows, okay?' says Amma.",
      "He climbs like a lizard and jumps like a goat. 'Don’t slip!' says Amma.",
      "Satya flaps his arms like wings and tries to fly away. He imagines himself soaring and gliding like a vulture.",
      "Late in the evening, when the sun sets and crickets begin to hum, it’s time to go home. Tired Satya climbs on to his mother's back. They return through the up-and-down paths, fields, forests and streams.",
      "At home, Appa, Akka and Thaatha take one look at bruised and muddy Satya, and burst into laughter.",
      "Thaatha bathes him. Appa cooks him dinner. Akka tells him his favourite story as he falls asleep.",
      "In his dreams, Satya runs and jumps and spins and rolls",
      "and flies away!",
      "How do they move? Oh, the way Satya moves! Did you know that animals, birds and insects also move in many different ways and for different reasons? Like us, they move mainly to find delicious food, a cozy home and a warm family. Some of them also move to escape from being caught and eaten by other animals. Find out how some of these creatures move!",
      "Dolphins are famous for how they leap out of water. Can you leap? Cheetahs are the fastest land animals. They can run really fast and sprint too, especially when they hunt. Can you sprint?",
      "Crabs can walk sideways. Can you walk sideways? Grasshoppers can jump really high, especially when they want to escape from being eaten. Can you jump really high?Grasshoppers can jump really high, especially when they want to escape from being eaten. Can you jump really high? Snails crawl. Slowly. Very, very slowly. Can you crawl slowly?"
    ]},
    lang:'en'
  },
  {
    id: 4,
    avatar: "cat",
    title: "It's All the Cat's Fault!",
    story:{
      val:[
        "Why haven’t you done your homework? Miss, it’s all the cat’s fault.",
        "If she had not got stuck on the tree, I would not have taken the ladder to climb it.",
        "If I had not taken the ladder to climb it, I would not have needed to fix it. If I had not needed to fix it, I wouldn’t have woken up the baby.",
        "If I had not woken up the baby, my mother would not have rushed out of the kitchen. If my mother had not rushed out of the kitchen, the monkey would not have got in.",
        "If the monkey had not got in, he would not have eaten up all the food. If he had not eaten up all the food, my father would not have bought rotis and chicken curry at the tea-shop.",
        "If my father had not bought rotis and chicken curry at the tea-shop, the dog would not have followed him home.",
        "If the dog had not followed him home, he would not have eaten my homework.",
        "So, you’re saying the dog ate your homework?",
        "Yes, Miss, it’s all the cat’s fault!",        
      ]
    },
    lang:'en'
  },
  {
    id: 5,
    avatar: "found",
    title: "TAMIL STORY 1",
    story:
    {val:[
    "Sophie was a little girl who loved to explore",
    "She lived in a small town with her parents", 
    "and she would often wander off into the woods behind their house, looking for adventure.",
    ]},
    lang:'ta'
  },
  {
    id: 6,
    avatar: "found",
    title: "TAMIL STORY 2",
    story:{val:[
      "Sophie was a little girl who loved to explore",
      "She lived in a small town with her parents", 
      "and she would often wander off into the woods behind their house, looking for adventure.",
      ]},
      lang:'ta'
  },
  {
    id: 7,
    avatar: "found",
    title: "LOST AND FOUND",
    story:
    "Sophie was a little girl who loved to explore. She lived in a small town with her parents, and she would often wander off into the woods behind their house, looking for adventure.",
  },
  {
    id: 8,
    title: "SINGING IN THE RAIN",
    avatar: "singing",
    story:
      "Satya was a young boy who loved to explore the forest near his village. He often went out alone, taking in the sights and sounds of the natural world around him.",
  },
  {
    id: 9,
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

  const handleLanguage=(lang)=>{
    localStorage.setItem('apphomelang',lang);
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
                index < 4
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
                  interactCall("storySelect", "home","DT", "");
                  storySelect(item);
                  handleLanguage(item.lang)
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
