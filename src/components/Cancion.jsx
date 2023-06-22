
import React from 'react'

export default function Cancion({currentCancion}) {
  return (
    <div>
        <div className="cancion-container">
            <img src={currentCancion.cover} alt='song'></img>
            <h2>{currentCancion.name}</h2>
            <h3>{currentCancion.artist}</h3>
        </div>
    </div>
    
  )
}
