import { useState, useEffect } from "react"
import { updateComment, deleteComment } from "../../../../utils/backend"

export default function Comment({ data, refreshComments, userPermission }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

    const [hidecommentDisplay1,sethideCommentDisplay1] = useState('none')
    useEffect(()=>
    {
        if(userPermission==true)
        {
            sethideCommentDisplay1('flex')            
        }
        else
        {
            sethideCommentDisplay1('none')
        } 
    },[userPermission,[],{data}])

    // Update the form fields as the user types
    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // close the form 
        setShowEditForm(false)
        // update the comment in the backend
        updateComment(editFormData, data._id)
            .then(() => refreshComments())
    }

    // Delete a comment
    function handleDelete() {
        deleteComment(data._id)
            .then(() => refreshComments())
    }

    // Change the comment to a form if the showEditForm state variable is true
    if (showEditForm) {
        return (
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[40vw] mx-auto text-right sm:w-[60dvw]">
                <input
                    name="name"
                    className="px-2 py-1 w-full bg-gray-100"
                    placeholder="Your name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                />
                <br />
                <textarea
                    name="content"
                    className="p-2 my-2 h-[100px] w-full bg-gray-100"
                    placeholder="Share your thoughts!"
                    value={editFormData.content}
                    onChange={handleInputChange}
                />
                <div className="flex-col justify-center sm:flex-row sm:justify-end">
                    <div className="pt-4">
                        <button
                            onClick={() => {setShowEditForm(false)}}
                            className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2 text-xs md:text-md sm:text-sm ">
                            Close
                        </button>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2 text-xs md:text-md sm:text-sm">
                            Post
                        </button>
                    </div>                    
                </div>
            </form>
        )
    } else {
        return (
            <div
                className=" rounded-lg p-4 my-4 border-gray-700 border-2 w-[40vw] mx-auto sm:w-[60dvw]">
                <div className="w-full text-wrap x-overflow-clip">
                    <p className="font-bold">{data.name}</p>
                    <p className="my-2 text-xs sm:text-2xl">{data.content}</p>  
                </div>
                <div className="flex-col justify-center sm:flex-row sm:justify-end" style={{display:hidecommentDisplay1}}>
                    <div className="pt-4">
                        <button
                            onClick={() => { setShowEditForm(true)}}
                            className="text-white hover:bg-gray-800 font-bold py-2 w-[80px] bg-gray-700 rounded cursor-pointer mr-2 text-xs md:text-md sm:text-sm">
                            Edit
                        </button>
                    </div>
                    <div className="pt-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 w-[80px] rounded text-xs md:text-md sm:text-sm">
                            Delete
                        </button>   
                    </div>
                </div>
            </div>
        )
    }
}