import { Routes, Route } from "react-router-dom"
import Avatar from "./components/Avatar";
import Home from "./components/Home";
import Game from "./components/Game";
import Result from "./components/Result";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="player" element={ <Player/> } />
        <Route path="avatar" element={ <Avatar/> } />
        <Route path="play" element={ <Game/> } />
        <Route path="result" element={ <Result/> } />
      </Routes>
    </div>
  );
}

export default App;
