export const playAudio = function(isPlaying, audioRef) {

    if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
           
            playPromise.then(function(){
                audioRef.current.play();
            }).catch((error) => {console.log(error); playAudio(isPlaying, audioRef)})
        }
       
        
    }
}