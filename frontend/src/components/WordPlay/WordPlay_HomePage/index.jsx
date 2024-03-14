import { useEffect, useState} from "react"
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import WordPlayGallery from "../WordPlay_Gallery"



export default function WordPlay_HomePage({userPermission, noReload, setNoReload}) 
{
    const api_key = import.meta.env.VITE_API_NINJA_KEY
    const pathName = window.location.pathname;
    const [galleryContent, setGalleryContent] = useState([])
    const [gifs, setGifs] = useState([]);

    async function getGifs(url) 
    {
        const res = await fetch(url)
        const {data} = await res.json()
        setGifs([])
        setGifs(gifs=>gifs.concat(data))
    }

    async function getData(url) 
    {
        setGalleryContent([])
        const res = await fetch(url,
        {
            method: 'GET',
            headers: 
            {
                'X-Api-Key': api_key,
                'Content-Type': 'application/json',
            },
        })
        const tempdata = await res.json()
        setGalleryContent(galleryContent=>galleryContent.concat(tempdata))
        localStorage.setItem('galleryContent',JSON.stringify(tempdata))
    }

    function search(event)
    {
        event.preventDefault()
        if(pathName=="/wordplay/quotes")
        {
            getData(`https://api.api-ninjas.com/v1/quotes?category=${event.target.category.value}`)
        }
        if(pathName=="/wordplay/trivia")
        {
            getData(`https://api.api-ninjas.com/v1/trivia?category=${event.target.category.value}`)
        }

    }

    function getMore()
    {
        if(pathName=='/wordplay/quotes')
        {
            setGalleryContent()
            getData('https://api.api-ninjas.com/v1/quotes?')      
        }
        if(pathName=='/wordplay/riddles')
        {
            setGalleryContent()
            getData('https://api.api-ninjas.com/v1/riddles')          
        }
        if(pathName=='/wordplay/trivia')
        {
            setGalleryContent()
            getData('https://api.api-ninjas.com/v1/trivia')           
        }     
    }

    useEffect(()=>
    {
        if(noReload==false)
        {
            if(pathName=='/wordplay/quotes')
            {
                setGalleryContent([])
                getData('https://api.api-ninjas.com/v1/quotes?')   
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=quotes&limit=5`)       
            }
            if(pathName=='/wordplay/riddles')
            {
                setGalleryContent([])
                getData('https://api.api-ninjas.com/v1/riddles')  
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=riddles&limit=5`)       
            }
            if(pathName=='/wordplay/trivia')
            {
                setGalleryContent([])
                getData('https://api.api-ninjas.com/v1/trivia') 
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=trivia&limit=5`)       
            }           
        }
        else
        {
            if(pathName=='/wordplay/quotes')
            {
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=quotes&limit=5`)       
            }
            if(pathName=='/wordplay/riddles')
            {
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=riddles&limit=5`)       
            }
            if(pathName=='/wordplay/trivia')
            {
                setGifs([])
                getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=trivia&limit=5`)       
            }        
            setGalleryContent([])
            setGalleryContent(galleryContent=>galleryContent.concat(JSON.parse(localStorage.getItem('galleryContent'))))
        }
    },[pathName],[])
    

     if(gifs.length>0)
    {
        return (
            <>
                <div className='flex flex-nowrap max-h-[20dvh] min-h-[10dvh]'>
                    <img src={gifs[0].images.original.url} className="relative card-image min-w-[20dvw] max-h-[20dvh] max-w-[10dvw] "/>
                    <img src={gifs[1].images.original.url} className="relative card-image min-w-[20dvw] max-h-[20dvh] max-w-[10dvw] "/>
                    <img src={gifs[2].images.original.url} className="relative card-image min-w-[20dvw] max-h-[20dvh] max-w-[10dvw] "/>
                    <img src={gifs[3].images.original.url} className="relative card-image min-w-[20dvw] max-h-[20dvh] max-w-[10dvw] "/>
                    <img src={gifs[4].images.original.url} className="relative card-image min-w-[20dvw] max-h-[20dvh] max-w-[10dvw] "/>    
                </div>
                <nav className="flex items-center justify-between h-16 bg-[#607466] shadow-lg lg:px-9 md:px-6 px-3">
                    <Link onClick= {()=>{
                        setNoReload(false)
                        getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=quotes&limit=5`);
                        }} to="/wordplay/quotes">
                        <h1 className="text-white font-bold md:text-3xl sm:text-2xl hover:text-[#C19A6B]" >Quotes</h1>
                    </Link>
                    <Link onClick= {()=>setNoReload(false)} to="/wordplay/riddles">
                        <h1 className="text-white font-bold md:text-3xl sm:text-2xl hover:text-[#C19A6B]" >Riddles</h1>
                    </Link>
                    <Link onClick= {()=>setNoReload(false)}to="/wordplay/trivia">
                        <h1 className="text-white font-bold md:text-3xl sm:text-2xl hover:text-[#C19A6B]" >Trivia</h1>
                    </Link>
                </nav>
                <div className="w-dvw flex justify-center pt-5">
                    {pathName ==='/wordplay/quotes' ? (
                        <form onSubmit={search}>
                            <label className= "pr-5" htmlFor="category">Choose A Category:</label>
                            <select className= "text-center" name="category" id="category">
                                <option value="age">age</option>
                                <option value="alone">alone</option>
                                <option value="amazing">amazing</option>
                                <option value="anger">anger</option>
                                <option value="architecture">architecture</option>
                                <option value="art">art</option>
                                <option value="attitude">attitude</option>
                                <option value="beauty">beauty</option>
                                <option value="best">best</option>
                                <option value="birthday">birthday</option>
                                <option value="business">business</option>
                                <option value="car">car</option>
                                <option value="change">change</option>
                                <option value="communication">communication</option>
                                <option value="computers">computers</option>
                                <option value="cool">cool</option>
                                <option value="courage">courage</option>
                                <option value="dad">dad</option>
                                <option value="cool">dating</option>
                                <option value="death">death</option>
                                <option value="design">design</option>
                                <option value="dreams">dreams</option>
                                <option value="education">education</option>
                                <option value="environmental">environmental</option>
                                <option value="equality">equality</option>
                                <option value="experience">experience</option>
                                <option value="failure">failure</option>
                                <option value="faith">faith</option>
                                <option value="family">family</option>
                                <option value="fear">fear</option>
                                <option value="fitness">fitness</option>
                                <option value="food">food</option>
                                <option value="forgiveness">forgiveness</option>
                                <option value="freddom">freedom</option>
                                <option value="friendship">friendship</option>
                                <option value="funny">funny</option>
                                <option value="future">future</option>
                                <option value="god">god</option>
                                <option value="good">good</option>
                                <option value="government">government</option>
                                <option value="graduation">graduation</option>
                                <option value="great">great</option>
                                <option value="happiness">happiness</option>
                                <option value="health">health</option>
                                <option value="history">history</option>
                                <option value="home">home</option>
                                <option value="hope">hope</option>
                                <option value="humor">humor</option>
                                <option value="imagination">imagination</option>
                                <option value="inspirational">inspirational</option>
                                <option value="intelligence">intelligence</option>
                                <option value="jealousy">jealousy</option>
                                <option value="knowledge">knowledge</option>
                                <option value="leadership">leadership</option>
                                <option value="learning">learning</option>
                                <option value="legal">legal</option>
                                <option value="life">life</option>
                                <option value="love">love</option>
                                <option value="marriage">marriage</option>
                                <option value="men">men</option>
                                <option value="money">money</option>
                                <option value="morning">morning</option>
                                <option value="movies">movies</option>
                                <option value="success">success</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-[#D2B48C] box-border mx-1 px-3 py-[6px] text-lg border-2 border-gray-700 rounded-lg font-semibold hover:bg-gray-700 hover:opacity-70 transition-all duration-200 ease-in-out">
                                Search
                            </button>
                        </form> )
                    : pathName === '/wordplay/riddles' ? (
                        <button className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#D2B48C] rounded cursor-pointer mr-2" onClick={getMore}>GET MORE!</button> )
                    : pathName === '/wordplay/trivia' ? (
                        <form onSubmit={search}>
                            <label className= "pr-5" htmlFor="category">Choose A Category:</label>
                            <select className= "text-center" name="category" id="category">
                                <option value="artliterature">artliterature</option>
                                <option value="language">language</option>
                                <option value="sciencenature">sciencenature</option>
                                <option value="general">general</option>
                                <option value="fooddrink">fooddrink</option>
                                <option value="peopleplaces">peopleplaces</option>
                                <option value="geography">geography</option>
                                <option value="historyholidays">historyholidays</option>
                                <option value="entertainment">entertainment</option>
                                <option value="toysgames">toysgames</option>
                                <option value="music">music</option>
                                <option value="mathematics">mathematics</option>
                                <option value="religionmythology">religionmythology</option>
                                <option value="sportsleisure">sportsleisure</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-[#D2B48C] box-border mx-1 px-3 py-[6px] text-lg border-2 border-gray-700 rounded-lg font-semibold hover:bg-gray-700 hover:opacity-70 transition-all duration-200 ease-in-out">
                                Search
                            </button>
                    </form>  )
                    :null
                }
                </div>
                {/* <button className="text-white font-bold py-2 px-4 bg-gray-800 rounded cursor-pointer mr-2">GET MORE</button>   */}
                <WordPlayGallery
                    contents={galleryContent}
                    userPermission={userPermission}
                />
            </>
        )
    }
}