
import React from "react";
import Player from "./components/Player";
import Cancion from "./components/Cancion";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { playAudio } from "./util";
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

    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)

    const animationPercentage = Math.round(roundedCurrent / roundedDuration *100)

    setCancionInfo({ ...cancionInfo, currentTime: current, duration: duration });
  }

  // const cancionEndedHandler = () => {
  //   let currentIndex = canciones.findIndex((cancion) => cancion.id === currentCancion.id);
  //   setCurrentCancion(canciones[(currentIndex + 1) % canciones.length]);

  //   audioRef.onLoadedMetadata({playAudio});
  // }

  return (
    <div className= {`App ${libraryStatus? "library-active": ""}`}>
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
        setCanciones={setCanciones}
        
        timeUpdateHandler={timeUpdateHandler}
        
    
        >

      </Player>

      <Library
        canciones={canciones}
        setCurrentCancion={setCurrentCancion}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setCanciones={setCanciones}
        libraryStatus={libraryStatus}
        timeUpdateHandler={timeUpdateHandler}
      />
      {/* <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onEnded={cancionEndedHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentCancion.audio}>

      </audio> */}
    </div>
  );
}

export default App;
