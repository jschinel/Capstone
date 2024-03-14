import { useState, useEffect } from "react"
import { postComment, getComments } from "../../../../utils/backend"
// import { comment } from "postcss"
import Comment from "../Joke_Comment"


export default function commentSection({ joke, userPermission }) {
    // Save comments queried from the database in state
    const[display,setdisplay]=useState('none')
    const [comments, setComments] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    })
    // Query the database for all comments that pertain to this artwork on component mount
    useEffect(() => {
        getComments(joke.replace('?',''))
            .then(comments => setComments(comments))
    }, [])
    
    useEffect(()=>
    {
        if(userPermission==true)
        {
            setdisplay('block')
        }
        else
        {
            setdisplay('none')
        }

    },[userPermission,[]])

    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create a comment on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    // Update the comments in the comment section after a database transaction
    function refreshComments() {
        getComments(joke.replace('?',''))
            .then(newCommentData => setComments(newCommentData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            name: '',
            content: ''
        })
        // close the form
        setShowCreateForm(false)
        setShowCreateForm(false)
        // create the comment in the backend
        postComment({ ...createFormData, contentName: joke.replace('?',''), actualContent: joke, type:'Joke'})
            .then(() => refreshComments())
    }

    // conditionally render comments
    let commentElements = [<p key='0' className='text-center text-xs md:text-3xl sm:text-2xl'>No comments yet. Be the first to comment!</p>]
    if (comments.length > 0) {
        commentElements = comments.map(comment => {
            return <Comment
                key={comment._id}
                data={comment}
                refreshComments={refreshComments}
                userPermission={userPermission}
            />
        })
    }   
    // conditionally display the text of the create form button
    let btnText = 'Post Comment'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className=' comment-section bg-[#CFC0B5] rounded-t-lg p-2 pb-10 mt-4 mx-10 space-y-4 relative'>
            <div style= {{display: display}}>
                <button
                    onClick={toggleCreateForm}
                    className="top-0 text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2 text-xs md:text-md sm:text-sm"
                >
                    {btnText}
                </button>
                {
                    showCreateForm && <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[35vw] mx-auto text-right sm:w-[60vw]">
                        <input
                            name="name"
                            className="px-2 py-1 w-full bg-gray-100 text-xs md:text-md sm:text-sm"
                            placeholder="Your name"
                            value={createFormData.name}
                            onChange={handleInputChange}
                        />
                        <br />
                        <textarea
                            name="content"
                            className="p-2 my-2 h-[100px] w-full bg-gray-100 text-xs md:text-md sm:text-sm"
                            placeholder="Share your thoughts!"
                            value={createFormData.content}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2 text-xs md:text-md sm:text-sm">
                            Post
                        </button>
                    </form>
                }
            </div>
            <div className='overflow-y-scroll scroll-auto max-h-[50dvh]'>
                  {commentElements}
            </div>
        </div>
    )
}
