import { useEffect, useState } from "react"
import { getUser, getUserComments } from "../../../utils/backend"



export default function UserProfile() 
{
    const[user,setUser]=useState({})
    const[userComments,setUserComments]=useState([])
    const[showComments,setShowComments]=useState(false)
    const[index,setIndex]=useState(0)
    useEffect(()=>
    {
        setUserComments([])
        getUser(localStorage.getItem('email'))
            .then(newUser => setUser(newUser))
    },[])

    useEffect(()=>
    {
        if(user.hasOwnProperty('_id'))
        {
            getUserComments(user._id)
                .then(newUserComments => setUserComments(newUserComments))                   
        }
    },[user])

    useEffect(()=>{
        if(userComments.length>0)
        {
            setShowComments(true)
        }
        else
        {
            setShowComments(false)
        }
    },[userComments])

    function increment() {
        if(index<userComments.length-1)
        {
            setIndex(index+1)            
        }
    }
    function decrement() {
        if(index>0)
        {
            setIndex(index-1)            
        }
    }

    return(
        <>
            <div className="pt-20 pb-20 pl-10">
                <h1 className="text-4xl underline pb-10">User Profile</h1>
                <h1>Email: {user.email}</h1>                  
            </div>
            {showComments ?
                    <>
                        <div className="flex">
                            <div className="pb-20 pl-10">
                                <h1 className="text-4xl underline pb-10">Comment History</h1>
                                <h1>Date Created: {userComments[index+0].createdAt}</h1>
                                <h1>Last Updated: {userComments[index+0].updatedAt}</h1>
                                <h1>Name: {userComments[index+0].name}</h1>
                                <h1>Content: {userComments[index+0].actualContent}</h1>
                                <h1>Comment: {userComments[index+0].content}</h1>                    
                            </div>
                        </div>
                        <button 
                            className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2"
                            onClick={(decrement)}
                        >Previous</button>
                        <button 
                            className="text-Black hover:bg-[#605C4E] font-bold py-2 px-4 bg-[#886C59] rounded cursor-pointer mr-2"
                            onClick={(increment)}
                        >Next</button>
                    </>                         
                    :
                        <div className="pb-20 pl-10">
                            <h1 className="text-4xl underline pb-10">Comment History</h1>
                            <h1>No comments posted yet</h1>              
                        </div>
                    }
        </>
    )
}

