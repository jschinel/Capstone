import './styles.css'
import { useEffect, useState } from "react"
import CommentSection from '../Joke_CommentSection'

export default function Card({ joke, userPermission }) {
    const[commentDisplay,setCommentDisplay]=useState(false)
    const[hidecommentDisplay1,sethideCommentDisplay1]=useState('block')
    const[hidecommentDisplay2,sethideCommentDisplay2]=useState('none')
    
    function toggleComments()
    {
        setCommentDisplay(!commentDisplay)
        if(commentDisplay==true)
        {
            sethideCommentDisplay1('none')
            sethideCommentDisplay2('block')
        }
        else
        {
            sethideCommentDisplay1('block')
            sethideCommentDisplay2('none')
        }
    }
    useEffect(()=>
    {
        sethideCommentDisplay1('block')
        sethideCommentDisplay2('none')
        
    },[userPermission])
    return (
        <>
        <figure className="relative mb-5 w-full break-inside-avoid-column border-2 border-black rounded-xl bg-[#D2B48C] min-h-fit text-wrap">
            <h1 className="text-1xl p-10 text-center text-xs md:text-4xl sm:text-2xl">{joke.joke}</h1>
            <div className="mb-4">
                <div className = "pl-5" style={{display:hidecommentDisplay1}}>
                    <button onClick={toggleComments}>Comments</button>
                    <span>&#10147;</span>               
                </div>
                <div style={{display:hidecommentDisplay2}}>
                    <button className='pl-5' onClick={toggleComments}>Comments</button>
                    <span>&#11163;</span>
                    <CommentSection joke={joke.joke.replace('?','')} userPermission={userPermission} />              
                </div>
            </div>
        </figure>
        </>
    )
}