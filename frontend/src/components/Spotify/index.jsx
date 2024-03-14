import { useEffect, useState} from "react"
import { Routes, Route, Link, useNavigate, Navigate} from "react-router-dom";
import { addCodeVerifier, getUserCodeVerifier} from "../../../utils/backend"
import SpotifyWebApi from 'spotify-web-api-node'
import SearchSongResult from "./SongSearchResult.jsx";
import Player from "./player.jsx";

const pathName = window.location.pathname;

export default function Spotify() 
{
    const navigate =useNavigate()
    const pathName = window.location.pathname;
        /**
     * This is an example of a basic node.js script that performs
     * the Authorization Code with PKCE oAuth2 flow to authenticate 
     * against the Spotify Accounts.
     *
     * For more information, read
     * https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
     */
    const [loggedIn,setLoggedIn]=useState(false)
    const [login,setLogin]=useState(true)
    const [userData,setUserData]=useState(localStorage.getItem('userData'))
    const [responseData,setResponseData]=useState({
        code_verify: "",
        email: "",
    });
    const [codeVerifySet,setCodeVerifySet]=useState(false)



    const clientId = `${import.meta.env.VITE_SPOTIFY_CLIENTID}`; // your clientId
    const redirectUrl = `${import.meta.env.VITE_SPOTIFY_REDIRECT}`;        // your redirect URL - must be localhost URL and/or HTTPS

    const authorizationEndpoint = "https://accounts.spotify.com/authorize";
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const scope = 'streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state';

    // Data structure that manages the current active token, caching it in localStorage
    const currentToken = {
    get access_token() { return localStorage.getItem('Spotify_access_token') || null; },
    get refresh_token() { return localStorage.getItem('Spotify_refresh_token') || null; },
    get expires_in() { return localStorage.getItem('Spotify_expires_in') || null },
    get expires() { return localStorage.getItem('Spotify_expires') || null },

    save: function (response) {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem('Spotify_access_token', access_token);
        localStorage.setItem('Spotify_refresh_token', refresh_token);
        localStorage.setItem('Spotify_expires_in', expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + (expires_in * 1000));
        localStorage.setItem('Spotify_expires', expiry);
    }
    };

    async function getToken(code, newCodeVerifier) 
    {     
        const code_verifier = localStorage.getItem('code_verifier');
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: clientId,
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirectUrl,
              code_verifier: code_verifier,
            }),
          });
          return await response.json()
    };

    useEffect(()=>{
        async function getSpotifyToken(code)
        {
            const email = localStorage.getItem('email')
            const newCodeVerifier = await getUserCodeVerifier(email)
            // If we find a code, we're in a callback, do a token exchange
            const token = await getToken(code, newCodeVerifier);
            currentToken.save(token);
            
            // If we find a code, we're in a callback, do a token exchange
            // Remove code from URL so we can refresh correctly.
            const url = new URL(window.location.href);
            url.searchParams.delete("code");

            const updatedUrl = url.search ? url.href : url.href.replace('?', '');
            window.history.replaceState({}, document.title, updatedUrl);
            // If we have a token, we're logged in, so fetch user data and render logged in template
            if (currentToken.access_token) {
                const userDataResponse = await getUserData();
                localStorage.setItem('userData', JSON.stringify(userDataResponse))
                setUserData(userDataResponse)
                setLoggedIn(true)
                setLogin(false)
            }

            // Otherwise we're not logged in, so render the login template
            if (!currentToken.access_token) {
                setLogin(true)
                setLoggedIn(false)
            }
            
        }
        // On page load, try to fetch auth code from current browser search URL
        const args = new URLSearchParams(window.location.search);
        const code = args.get('code');
        if(code && !currentToken.access_token)
        {
            getSpotifyToken(code)
        }
        if (currentToken.access_token){
            async function reload(){
            const userDataResponse = await getUserData();
            localStorage.setItem('userData', JSON.stringify(userDataResponse))
            setUserData(userDataResponse)
            const playlists= await getUserPlaylist()
            setLogin(false)
            setLoggedIn(true)
            }
            reload()
        }
        if(!currentToken)
        {
            setLogin(true)
            setLoggedIn(false)
        }
    },[])

    async function loginWithSpotifyClick() 
    {
        await redirectToSpotifyAuthorize();
    }

    async function getUserData() 
    {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
        });
        
        return await response.json();
    }

    async function redirectToSpotifyAuthorize() 
    {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

        const code_verifier = randomString;
        const data = new TextEncoder().encode(code_verifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);

        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        //Setting the code_verifier to the user profile to access on the backend
        const email = localStorage.getItem('email')
        setResponseData({code_verify:`${code_verifier}`,email:email})

        window.localStorage.setItem('code_verifier', code_verifier);

        const user_update = await addCodeVerifier(responseData)
        setCodeVerifySet(true)

        if(codeVerifySet)
        {
            const authUrl = new URL(authorizationEndpoint)
            const params = {
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                code_challenge_method: 'S256',
                code_challenge: code_challenge_base64,
                redirect_uri: redirectUrl,
            };   
            authUrl.search = new URLSearchParams(params).toString();
            window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
        }
    }

    async function logoutClick() 
    {
        localStorage.removeItem("Spotify_access_token")
        localStorage.removeItem('Spotify_refresh_token')
        localStorage.removeItem('Spotify_expires_in')
        localStorage.removeItem('Spotify_expires')
        localStorage.removeItem('code_verifier')
        window.location.href = redirectUrl;
    }

    async function refreshTokenClick() {
        const token = await refreshToken();
        currentToken.save(token);
    }

    async function refreshToken() {
        const response = await fetch(tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: currentToken.refresh_token
          }),
        });
        return await response.json();
    }

    // GET THE CURRENT USERS PLAYLIST
    async function getUserPlaylist() 
    {
        const response = await fetch("https://api.spotify.com/v1/users/jschinel-2/playlists?offset=0&limit=20", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
        });
        
        return await response.json();
    }

    const spotiftyApi = new SpotifyWebApi({
        clientId: clientId,
    })
    const [searchSong, setsearchSong]=useState("")
    const [searchPlaylist, setSearchPlaylist]=useState("")    
    const [searchSongResults,setSearchSongResults]=useState([])
    const [searchPlaylistResults,setSearchPlaylistResults]=useState([])
    const [playingTrack,setPlayingTrack]=useState()

    useEffect(()=>{

        if(!currentToken.access_token) return
        spotiftyApi.setAccessToken(currentToken.access_token)
        if(!searchSong) return setSearchSongResults([])
        if(!currentToken.access_token) return
        let cancel = false
        spotiftyApi.searchTracks(searchSong).then(res=>
        {
            if(cancel==true)return
            setSearchSongResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        })
        return() => cancel = true
    },[searchSong, currentToken.access_token])


    useEffect(()=>{

        if(!currentToken.access_token) return
        spotiftyApi.setAccessToken(currentToken.access_token)
        if(!searchPlaylist) return setSearchPlaylistResults([])
        if(!currentToken.access_token) return
        let cancel = false
        spotiftyApi.searchPlaylists(searchPlaylist).then(res=>
        {
            if(cancel==true)return
            setSearchPlaylistResults(
                res.body.playlists.items.map(playlist => {
                    const smallestAlbumImage = playlist.images.reduce((smallest,image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, playlist.images[0])

                    return {
                        title: playlist.name,
                        uri: playlist.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        })
        return() => cancel = true
    },[searchPlaylist, currentToken.access_token])


    async function chooseTrack(track){
        setPlayingTrack(track)
        setsearchSong("")
        setSearchPlaylist("")
    }
    
    if(login)
    {
        return (
            <>
                <div className="flex justify-between p-5">
                    <button className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2"  onClick={loginWithSpotifyClick}>
                    Log in with Spotify
                    </button>
                </div>
            </>
        )
    }
    if(loggedIn && Object.keys(userData))
    {
        return( 
            <>
            {window.innerWidth< 500 ? (
                <>
                <div className="flex justify-between pt- 3 px-5">
                    <div>
                        <button className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2 text-sm" onClick={refreshTokenClick}>Refresh Token</button>
                    </div>
                    <div>
                        <button className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2 text-sm" onClick={logoutClick}>Log out</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <form className="mb-1 mt-4 text-center">
                        <input
                            className="text-center"
                            type="searchSong"
                            placeholder="searchSong Songs/Artist"
                            value={searchSong}
                            onChange={event=> setsearchSong(event.target.value)}
                        />                    
                    </form>
                </div>
                <div className="flex justify-center">
                    <form className="my-2 text-center">
                        <input
                            className="text-center"
                            type="searchPlaylists"
                            placeholder="search playlist RocknRoll"
                            value={searchPlaylist}
                            onChange={event=> setSearchPlaylist(event.target.value)}
                        />                    
                    </form>
                </div>  
                </>)
                : (
                <>
                <div className="flex justify-between pt-3 px-5">
                    <div>
                        <button className="text-Black hover:bg-[#605C4E] font-bold py-1 px-2 bg-[#886C59] rounded cursor-pointer mr-2 text-sm" 
                        onClick={refreshTokenClick}>Refresh Token</button>
                    </div>
                    <div>
                        <form className="my-1 text-center pr-10">
                            <input
                                className="text-center"
                                type="searchSong"
                                placeholder="searchSong Songs/Artist"
                                value={searchSong}
                                onChange={event=> setsearchSong(event.target.value)}
                            />                    
                        </form>
                    </div>
                    <div>
                        <form className="my-1 text-center pr-10">
                            <input
                                className="text-center"
                                type="searchPlaylists"
                                placeholder="search playlist RocknRoll"
                                value={searchPlaylist}
                                onChange={event=> setSearchPlaylist(event.target.value)}
                            />                    
                        </form>
                    </div>  
                    <div>
                        <button className="text-Black hover:bg-[#605C4E] font-bold py-1 px-4 bg-[#886C59] rounded cursor-pointer mr-2 text-sm" onClick={logoutClick}>Log out</button>
                    </div>
                </div>
                </>
                )
                }
                <div className="pl-5 pr-5">
                    {pathName=="/music" ?(
                    <div>
                        <h1>Logged in as <span>{userData.display_name}</span></h1>
                        <div>
                            <h1>Display name: {userData.display_name}</h1>
                        </div>
                        <div>
                            <h1>Id: {userData.id}</h1>
                        </div>
                        <div>
                            <h1>Email: {userData.email}</h1>
                        </div>
                        <div>
                            <h1>Country: {userData.country}</h1>
                        </div>
                        <div className="pt-5">
                            <h1>Access token: <br />{localStorage.getItem('Spotify_access_token')}</h1>
                        </div>
                        <div className="pt-5">
                            <h1>Refresh token: <br />{localStorage.getItem("Spotify_refresh_token")}</h1>
                        </div>
                    </div>
                    ):null}
                    <div>
                        {searchSongResults.map(track => (
                            <SearchSongResult
                            track={track} 
                            key={track.uri}
                            chooseTrack={chooseTrack}
                            />
                        ))}
                    </div>
                    <div>
                        {searchPlaylistResults.map(track => (
                            <SearchSongResult
                            track={track} 
                            key={track.uri}
                            chooseTrack={chooseTrack}
                            />
                        ))}
                    </div>
                    <div className=" flex justify-center">
                        <Player accessToken={currentToken.access_token} trackUri={playingTrack?.uri} />
                    </div>
                </div>
            </>
        )
    }
}
