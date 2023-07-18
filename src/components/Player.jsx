import React from 'react'
import { playAudio } from '../util'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons"

export default function Player({ currentCancion, isPlaying, setIsPlaying, audioRef, cancionInfo, setCancionInfo, canciones, setCurrentCancion, setCanciones, timeUpdateHandler }) {


  const activeLibraryHandler = (nextPrev) => {
    
    const newCanciones = canciones.map((aCancion) => {
      if (aCancion.id === nextPrev.id) {
        return {
          ...aCancion,
          active: true
        }
      }
      else {
        return {
          ...aCancion,
          active: false
        }
      }
    })
    setCanciones(newCanciones);

  };

  //event Hanlders
  const playCancionHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    else {
      audioRef.current.play();
      setIsPlaying(true);
    }

  }



  const cancionEndedHandler = async () => {
    let currentIndex = canciones.findIndex((cancion) => cancion.id === currentCancion.id);

    setCurrentCancion(canciones[(currentIndex + 1) % canciones.length]);

    if (isPlaying) {
      playAudio(true, audioRef);
    }

  };

  const dragHandler = (e) => {
    // changes the value of the audioinput
    audioRef.current.currentTime = e.target.value;
    setCancionInfo({ ...cancionInfo, currentTime: e.target.value })
  }

  // skip track
  const skipTrackHandler = (direction) => {
    let currentIndex = canciones.findIndex((cancion) => cancion.id === currentCancion.id);
    if (direction === 'skip-forward') {
      setCurrentCancion(canciones[(currentIndex + 1) % canciones.length]);
      activeLibraryHandler(canciones[(currentIndex + 1) % canciones.length]);
    }
    if (direction === 'skip-back') {
      if (currentIndex - 1 < 0) 
      {
        setCurrentCancion(canciones[canciones.length - 1]);
        activeLibraryHandler(canciones[(canciones.length - 1)]);
      }
      else 
      {
        setCurrentCancion(canciones[(currentIndex - 1) % canciones.length]);
        activeLibraryHandler(canciones[(currentIndex - 1) % canciones.length]);
      }

    }
    playAudio(isPlaying, audioRef);
  };


  const trackAnim = {
    transform: `translateX(${cancionInfo.currentTime / cancionInfo.duration * 100}%)`
  }

  const getTime = (time) => {

    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  }

  // States


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(cancionInfo.currentTime)}</p>

        <div style={{ background: `linear-gradient(to right, ${currentCancion.color[0]},${currentCancion.color[1]})`, }} className="track">
          <input
            value={cancionInfo.currentTime}
            type="range"
            max={cancionInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{cancionInfo.duration ? getTime(cancionInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon size='2x' onClick={() => skipTrackHandler('skip-back')} className='skip-back' icon={faAngleLeft}></FontAwesomeIcon>
        <FontAwesomeIcon
          size='2x'
          className='play'
          icon={isPlaying ? faPause : faPlay}
          onClick={playCancionHandler}></FontAwesomeIcon>
        <FontAwesomeIcon size='2x' onClick={() => skipTrackHandler('skip-forward')} className='skip-forward' icon={faAngleRight}></FontAwesomeIcon>

      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={cancionEndedHandler}

        src={currentCancion.audio}>

      </audio>

    </div>
  )
}
