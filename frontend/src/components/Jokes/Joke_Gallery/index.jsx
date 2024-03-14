import { useEffect, useState } from 'react'
import Card from '../Joke_Card'

export default function JokeGallery({ jokes, userPermission }) {


    // The default value of gallery content. What we see before the app finsihes querying the API.

    let galleryContent = <p>Thinking of a joke...</p>
    if (jokes.length > 0) {
        // Slice the 20 corresponding countries and create Cards for them
        galleryContent = jokes
            .map(joke => <Card key = {joke.joke} joke={joke} userPermission={userPermission}/>)
    }
    return (
        <>
            <div className="flex-col w-4/5 mt-5 mx-auto ">
                {/* Render whatever the value of the galleryContent variable is */}
                {galleryContent}
            </div>
        </>
    )
}