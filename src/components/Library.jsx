import React from 'react'
import LibraryCancion from './LibraryCancion'

export default function Library({canciones, setCurrentCancion, audioRef, isPlaying, setCanciones, libraryStatus}) {
  return (
    <div className={`library ${libraryStatus? "active-library":""}`}>
        
        <h2>Library</h2>
        <div className="library-canciones">
            {canciones.map(aCancion => <LibraryCancion 
                cancion = {aCancion}
                canciones = {canciones} 
                setCurrentCancion={setCurrentCancion}
                id = {aCancion.id}
                key ={aCancion.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setCanciones ={setCanciones} /> )} 
        </div>
        
    </div>
  )
}
