import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import HomePage from '../HomePage'
import Jokes_HomePage from '../Jokes/Jokes_HomePage'
import WordPlay_HomePage from '../WordPlay/WordPlay_HomePage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'
import './styles.css'
import UserProfile from '../UserProfile';
import Spotify from '../Spotify';
import Calendar from '../calendar';


export default function App() { 
    const navigate =useNavigate()
    const [userPermission,setUserPermission]=useState(false)
    const [authInActive,setAuthInActive]=useState('flex')
    const [authActive,setAuthActive]=useState('none')
    const [noReload,setNoReload]=useState(false)
    const [spotifyFooter,setSpotifyFooter]=useState(0)
    const [spotifyPosition,setSpotifyPosition]=useState("absolute")
    const [showHide,setShowHide]=useState('block')
    const [hideMenu,setHideMenu]=useState(localStorage.getItem('HideMenu'))
    const [toggleMenu,setToggleMenu]=useState()
    const pathName = window.location.pathname;
    const user = localStorage.getItem('userToken')

    // Call the async function on component mount
    useEffect(() => 
    {

        if(localStorage.getItem('userToken')!==null)
        {
            setUserPermission(true)
            setAuthActive('flex')
            setAuthInActive('none')
        }
        else
        {
            setAuthActive('none')
            setAuthInActive('flex')
        }
    }, [pathName])
    
    useEffect(()=>
    {
       localStorage.setItem('HideMenu','none')
    },[toggleMenu])

    // Code to conditionally render screen based off of screen width

    // Add event listener for window resize
    window.addEventListener('resize', ()=> {
        location.reload();
    });


    //  Create the HTML using JSX for the App component fixing
    return (
        <>
            <div className="flex-col min-h-[100vh]">
                    {toggleMenu==true ? (
                        <div className="flex flex-col justify-center items-center fixed bg-[#475841] w-[100%] h-[100vh] list-none text-black font-bold text-5xl">
                            <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/">
                                <li className="hover:text-[#C19A6B]">Home</li>
                            </Link>
                            <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/jokes/general ">
                                <li className="hover:text-[#C19A6B]">Lighten Your Day</li>
                            </Link>
                            <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/wordplay/quotes ">
                                <li className="hover:text-[#C19A6B]">Learn Something New</li>
                            </Link>
                            <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/calendar">
                                <li className="hover:text-[#C19A6B]">Schedule Your Day</li>
                            </Link>
                            <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/music ">
                                <li className="hover:text-[#C19A6B]">Music</li>
                            </Link> 
                        </div>  
                    ):null}
                    <div className='flex justify-between px-5 py-3 bg-[#607466] list-none text-black font-bold text-lg md:text-3xl sm:text-2xl'>
                        <Link onClick= {()=>{setNoReload(false), setToggleMenu(!toggleMenu)}} to="/">
                            <li className="hover:text-[#C19A6B]"><span>&#9776;</span></li>
                        </Link>
                        <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2" style={{display: authInActive}}>
                            <Link onClick= {()=>{
                                setNoReload(true)
                                localStorage.setItem('url',pathName)
                            }} to="/auth/signup">
                                <li className="pr-5 hover:text-[#C19A6B]">Sign Up</li>
                            </Link>
                            <Link onClick= {()=>{
                                localStorage.setItem('url',pathName)
                                setNoReload(true)}} to="/auth/login">
                                <li className="hover:text-[#C19A6B]">Log In</li>
                            </Link>
                        </div>
                        <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2" style={{display: authActive}}>
                            <Link to="/profile">
                                <img src="/icons8-user-profile-32.png"/>
                            </Link> 
                            <button className="hover:text-[#C19A6B]"onClick={()=>
                                {
                                    localStorage.removeItem('userToken')
                                    localStorage.removeItem('email')
                                    setAuthActive('none')
                                    setAuthInActive('flex')
                                    setUserPermission(false)
                                }}>Log Out</button>
                        </div>
                    </div>
                <Routes>
                    <Route path="/" element={<HomePage setNoReload={setNoReload}/>} />

                    <Route path="/profile" element={<UserProfile />}/>
                    <Route path="/calendar" element={<Calendar/>}/>


                    <Route path="/auth/:formType" element={<AuthFormPage setNoReload={setNoReload}/>} />
                    <Route path="/auth/:formType" element={<AuthFormPage setNoReload={setNoReload}/>} />
                        
                    <Route path="/music" element={<Spotify/>} />
                    <Route path="/music/:code" element={<Spotify/>} />

                    
                    <Route path="/jokes/general" element={<Jokes_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload}/>} />
                    <Route path="/jokes/dad" element={<Jokes_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload} />} />
                    <Route path="/jokes/chucknorris" element={ <Jokes_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload} />} />

                    <Route path="/wordplay/riddles" element={<WordPlay_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload} />} />
                    <Route path="/wordplay/trivia" element={<WordPlay_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload} />} />
                    <Route path="/wordplay/quotes" element={<WordPlay_HomePage userPermission={userPermission} noReload={noReload} setNoReload={setNoReload} />} />
                </Routes>
            </div>
            {pathName!= "/music" ? (
                <>
                    <div className="bottom-0 bg-[#607466]" style= {{opacity: spotifyFooter, position: spotifyPosition, left: 10000}}>
                        <button
                            onClick={() => { setSpotifyFooter(0), setShowHide('block'), setSpotifyPosition("absolute")}}
                            className="text-Black font-bold py-2 px-4 rounded cursor-pointer mr-2">
                        <span>&#11163;</span>
                        </button>
                        <Spotify></Spotify>
                    </div>
                    <div className=" sticky pt-4 bottom-0" style={{display:showHide}}>
                        <button
                            onClick={() => { setSpotifyFooter(100), setShowHide('none'), setSpotifyPosition("sticky")}}
                            className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2 text-xs">
                            Spotify
                        </button>
                    </div>
                </>
            )
            :null}
        </>
    )
}