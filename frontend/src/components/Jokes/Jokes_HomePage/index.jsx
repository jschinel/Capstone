import {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import JokeGallery from "../Joke_Gallery"

export default function Jokes_HomePage({userPermission, noReload, setNoReload}) 
{
    const api_key = import.meta.env.VITE_API_NINJA_KEY
    const pathName = window.location.pathname;
    const [jokes, setJokes] = useState([])
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
        setJokes([])
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
        setJokes(jokes=>jokes.concat(tempdata))
        localStorage.setItem('jokes',JSON.stringify(tempdata))
    }

    function getMore()
    {
        if(pathName=='/jokes/general')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/jokes?limit=5')      
        }
        if(pathName=='/jokes/dad')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/dadjokes?limit=5')          
        }
        if(pathName=='/jokes/chucknorris')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/chucknorris?')           
        }     
    }

    useEffect(()=>
    {
    if(noReload==false)
    {
        if(pathName=='/jokes/general')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/jokes?limit=5')
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=jokes&limit=5`)       
        }
        if(pathName=='/jokes/dad')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/dadjokes?limit=5')
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=dad%20jokes&limit=5`)            
        }
        if(pathName=='/jokes/chucknorris')
        {
            setJokes()
            getData('https://api.api-ninjas.com/v1/chucknorris?')
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=chuck%20norris&limit=5`)            
        }            
    }
    else
    {
        if(pathName=='/jokes/general')
        {
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=jokes&limit=5`)       
        }
        if(pathName=='/jokes/dad')
        {
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=dad%20jokes&limit=5`)            
        }
        if(pathName=='/jokes/chucknorris')
        {
            setGifs([])
            getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=chuck%20norris&limit=5`)            
        }          
        setJokes([])
        setJokes(jokes=>jokes.concat(JSON.parse(localStorage.getItem('jokes'))))
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
                        getGifs(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_KEY}&q=jokes&limit=5`);
                        }} to="/jokes/general">
                        <h1 className="text-black text-center font-bold text-xs md:text-lg sm:text-lg hover:text-[#C19A6B]" >General <br />Jokes</h1>
                    </Link>
                    <Link onClick= {()=>setNoReload(false)} to="/jokes/dad">
                        <h1 className="text-black text-center font-bold text-xs md:text-lg sm:text-lg hover:text-[#C19A6B]" >Dad <br />Jokes</h1>
                    </Link>
                    <Link onClick= {()=>setNoReload(false)}to="/jokes/chucknorris">
                        <h1 className="text-black text-center font-bold text-xs md:text-lg sm:text-lg hover:text-[#C19A6B]" >Chuck Norris <br />Jokes</h1>
                    </Link>
                </nav>
                <div className="w-dvw flex justify-center pt-5">

                    <button className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#D2B48C] rounded cursor-pointer mr-2" onClick={getMore}>GET MORE!</button>
                </div>
                <JokeGallery
                    jokes={jokes}
                    userPermission={userPermission}
                />
            </>
        )
    }
}