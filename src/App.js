
import React from "react";
import Player from "./components/Player";
import Cancion from "./components/Cancion";
import Library from "./components/Library";
import Nav from "./components/Nav";

import { useState, useRef } from "react";
//import songs data
import data from "./data.js"
//import styles
import "./styles/app.scss";

function App() {

  //ref
  const audioRef = useRef(null);

  const [canciones, setCanciones] = useState(data());
  const [currentCancion, setCurrentCancion] = useState(canciones[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cancionInfo, setCancionInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false);

  //functions
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setCancionInfo({ ...cancionInfo, currentTime: current, duration: duration });
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Cancion currentCancion={currentCancion}></Cancion>
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentCancion={currentCancion}
        setCancionInfo={setCancionInfo}
        cancionInfo={cancionInfo}
        canciones={canciones}
        setCurrentCancion={setCurrentCancion}
        setCanciones ={setCanciones}>
          
      </Player>

      <Library 
        canciones={canciones} 
        setCurrentCancion={setCurrentCancion}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setCanciones = {setCanciones}
        libraryStatus={libraryStatus}
      />
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentCancion.audio}>

      </audio>
    </div>
  );
}

export default App;
