import React, { useState,useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({accessToken, trackUri}) {
    const [play , setPlay] = useState(false)
    useEffect(()=>{
        setPlay(true)
    },[trackUri])

    if(!accessToken) return null
    return (
        <SpotifyPlayer
            styles={{
                activeColor: 'black',
                bgColor: "#886C59",
                color: 'black',
                loaderColor: 'black',
                sliderColor: 'black',
                trackArtistColor: 'black',
                trackNameColor: 'black',
                logo:'black'
            }}
            token={accessToken}
            showSaveIcon
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
    )
}