
import React from 'react'
import { playAudio } from '../util';
export default function LibraryCancion({ cancion, canciones, setCurrentCancion, id, audioRef, isPlaying, setCanciones }) {


    const cancionSelectHandler = () =>{
        
        setCurrentCancion(cancion);
        const newCanciones = canciones.map((aCancion)=>{
            if(aCancion.id===id){
                return {
                    ...aCancion,
                    active:true
                } 
            }
            else{
                return{
                    ...aCancion,
                    active:false
                }
            }
        })
        setCanciones(newCanciones);

        playAudio(isPlaying, audioRef)
        
    }
    return (
        <div>
            <div className={`library-cancion ${cancion.active? 'selected': ''}`} onClick={cancionSelectHandler} >
                <img src={cancion.cover} alt='song'></img>
                <div className="cancion-description">
                    <h3>{cancion.name}</h3>
                    <h4>{cancion.artist}</h4>
                </div>

            </div>
        </div>

    )
}
