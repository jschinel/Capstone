import { useEffect, useState } from 'react'
import Card from '../WordPlay_Card'

export default function WordPlayGallery({ contents, userPermission }) {
    const pathName = window.location.pathname;
    const [galleryContent,setGalleryContent]=useState([])

    useEffect(()=>
    {
        if(pathName=='/wordplay/quotes')
        {
            setGalleryContent('Loading Quote...')
            if (contents.length > 0) {
                // Slice the 20 corresponding countries and create Cards for them
                setGalleryContent( contents
                    .map(content => <Card key = {content.quote} content={content} userPermission={userPermission}/>))
            }
        }
        if(pathName=='/wordplay/riddles')
        {
            setGalleryContent('Loading Riddle...')
            if (contents.length > 0) {
                // Slice the 20 corresponding countries and create Cards for them
                setGalleryContent( contents
                    .map(content => <Card key = {content.title} content={content} userPermission={userPermission}/>))
            }
        }
        if(pathName=='/wordplay/trivia')
        {
            setGalleryContent('Loading Trivia Question...')
            if (contents.length > 0) {
                // Slice the 20 corresponding countries and create Cards for them
                setGalleryContent( contents
                    .map(content => <Card key = {content.question} content={content} userPermission={userPermission}/>))
            }
        }     
    },[contents])
    if(galleryContent.length>0 && contents.length>0)
    {
        return (
            <>
                <div className="flex-col w-4/5 mt-5 mx-auto">
                    {/* Render whatever the value of the galleryContent variable is */}
                    {galleryContent}
                </div>
            </>
        )       
    }
}