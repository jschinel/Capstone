import './styles.css'
import { useEffect, useState } from "react"
import CommentSection from '../WordPlay_CommentSection'

export default function Card({ content, userPermission }) {
    const pathName = window.location.pathname;
    const[showComments,setShowComments]=useState(false)
    const [query, setQuery] = useState("")
    const[displayfeed,setDisplayFeed]=useState()
    const[answerResponse,setAnswerResponse]=useState("Goodluck!")

    function handleSubmit(event) {
        // prevent the form from reloading the page
        event.preventDefault()
        if(query==content.answer)
        {
            setAnswerResponse('CORRECT!!')
        }
        if(query!=content.answer)
        {
            setAnswerResponse('Sorry better luck next time!')
        }
        else
        {
            setAnswerResponse('Goodluck')
        }            
    }

    useEffect(()=>
    {
        if(pathName=='/wordplay/quotes') setDisplayFeed(content.quote)
        if(pathName=='/wordplay/riddles') setDisplayFeed(content.question)
        if(pathName=='/wordplay/trivia') setDisplayFeed(content.question)
    },[])

    if(pathName=='/wordplay/quotes'&&answerResponse!=true)
    {
        return (
            <>
            <figure className="relative mb-5 w-full break-inside-avoid-column border-2 border-black rounded-xl bg-[#D2B48C] min-h-fit text-wrap">
                <h1 className="p-10 text-center  text-xs md:text-4xl sm:text-2xl">{displayfeed}</h1>
                <div className="mb-4">
                    <div className>
                        <button className="pl-5" onClick={()=> setShowComments(!showComments)}>Comments</button>
                        {showComments ? 
                        <>
                            <span>&#11163;</span>
                            <CommentSection quote={content.quote} userPermission={userPermission} />                                 
                        </>
                        :
                            <span>&#10147;</span>    
                        }
                    </div>
                </div>
            </figure>
            </>
        )
    }
    if(pathName=='/wordplay/riddles'|| pathName=='/wordplay/trivia')
    {
        return (
            <>
                <figure className="relative mb-5 w-full break-inside-avoid-column border-2 border-black rounded-xl bg-[#D2B48C] min-h-fit text-wrap">
                    <h1 className="p-10 text-center text-xs md:text-3xl sm:text-2xl">{displayfeed}</h1> 
                    <div>
                        <div className='flex-row pl-10 sm:flex '>
                            <h1 className='pr-5 self-center'>ANSWER:</h1>
                            <form onSubmit={handleSubmit}>
                                    <input
                                        className='w-[100px]' 
                                        type="text" 
                                        value={query}
                                        onChange={event => setQuery(event.target.value)}
                                    />
                                    <button
                                        type='submit'
                                        className="box-border mx-1 px-3 py-[6px] text-lg border-2 border-gray-700 rounded-lg font-semibold hover:bg-gray-700 hover:opacity-70 transition-all duration-200 ease-in-out text-xs md:text-lg sm:text-md">
                                        submit    
                                    </button>    
                            </form>
                            <h1 className='pt-5 self-center text-xs md:text-xl sm:text-lg sm:pt-0'>{answerResponse}</h1> 
                        </div>
                        <div>
                        <button className='pt-5 pb-5 pl-10' onClick={()=> setShowComments(!showComments)}>Solution</button>
                        {showComments ? 
                        <>
                                <span>&#11163;</span>
                                <p className='pl-10 pb-5 text-xs md:text-3xl sm:text-2xl"'>{content.answer}</p>                                                           
                        </>
                        :
                            <span>&#10147;</span>    
                        }
                        </div>
                    </div>
                </figure>
            </>
        )
    }
}