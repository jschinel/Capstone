import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUserEvents, editEvent,deleteEvent} from "../../../utils/backend"


export default function EventModalEditDelete({getData, displayEditModal, setDisplayEditModal, eventData}) {
    const navigate = useNavigate();
    const [editForm, setEditForm]=useState(false)
    const [editStartDate, setStartDate]=useState(eventData.startDate)
    const [editEndDate, setEndDate]=useState(eventData.endDate)
    const [editStartTime, setStartTime]=useState(eventData.startTime)
    const [editEndTime, setEndTime]=useState(eventData.endTime)
    const [editDescription, setDescription]=useState(eventData.description)
    const [editColor, setColor]=useState(eventData.color)

    const handleStartDateChange = async (event)=>
    {
        event.preventDefault();
        setStartDate(event.target.value);
    }

    const handleEndDateChange = async (event)=>
    {
        event.preventDefault();
        setEndDate(event.target.value);
    }

    const handleStartTimeChange = async (event)=>
    {
        event.preventDefault();
        setStartTime(event.target.value);
    }

    const handleEndTimeChange = async (event)=>
    {
        event.preventDefault();
        setEndTime(event.target.value);
    }
    const handleDescriptionChange = async (event)=>
    {
        event.preventDefault();
        setDescription(event.target.value);
    }

    const handleColorChange = async (event)=>
    {
        event.preventDefault();
        setColor(event.target.value);
    }

    const handleSubmit = async (event) => 
    {
        event.preventDefault();

        // Retrieve form data
        const startDate = editStartDate;
        const endDate = editEndDate;
        const startTime = editStartTime;
        const endTime = editEndTime;
        const description = editDescription;
        const color = editColor;
        // Create an object to represent the event data
        const eventEditData = {
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            color,
        };
        console.log("testing form", eventEditData)
        await editEvent(eventEditData,eventData._id)
        getData()
        setDisplayEditModal('none')
    };

    
    if(eventData)
    { 
        return(
            <div className="flex flex-col h-screen w-full fixed left-0 top-0 justify-center items-center border border-gray-500">
                <header className="w-3/4 md:w-1/4 bg-gray-100 px-4 py-2 flex justify-between items-center border border-gray-500">
                    <span className="">
                        Calendar Event
                    </span>
                    <button onClick={()=>{
                        setEditForm(false)
                        setDisplayEditModal('none')}}>
                        close                
                    </button>
                </header>
                {editForm==false ? (
                    <div className="bg-white rounded-lg shadow-2xl w-3/4 md:w-1/4">
                        <div className="flex flex-col border border-gray-500">
                            <div className="p-5">
                                <div className="flex border border-gray-500">
                                    <h1 className="pr-5 pl-5" >Start Date:</h1>
                                    <h1>{eventData.startDate}</h1>   
                                </div>
                                <div className="flex border border-gray-500">
                                    <h1 className="pr-7 pl-5">End Date:</h1>
                                    <h1>{eventData.endDate}</h1>  
                                </div>
                                <div className="pt-10">
                                <h1 className="pb-1 underline font-bold">Military Time</h1>
                                    <div className="flex border border-gray-500">
                                        <h1 className="pr-5 pl-5">Start Time:</h1>
                                        <h1>{eventData.startTime}</h1>  
                                    </div>
                                    <div className="flex border border-gray-500">
                                        <h1 className="pr-7 pl-5">End Time:</h1>
                                        <h1>{eventData.endTime}</h1>  
                                    </div>
                                </div>
                                <div className="pt-10">
                                    <div className="flex flex-col border border-gray-500">
                                        <h1 className="pr-5 pl-0" >Description:</h1>
                                        <p className="min-h-[50px]">{eventData.description}</p>
                                    </div>
                                </div>
                                <div className="pt-10">
                                    <div className="flex">
                                        <h1 className="pr-5">Color:</h1>
                                        <span className="h-[27px] w-[50px]" style={{background:eventData.color}}></span>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-10">
                                    <button onClick={()=>{setEditForm(true)}}type= "submit" className=" w-[64px] h-[42px] bg-gray-400 border border-gray-500 rounded-[10%] p-2 hover:bg-gray-600">Edit</button>
                                    <button onClick={async ()=>{
                                        await deleteEvent(eventData._id)
                                        getData()
                                        setDisplayEditModal('none')
                                    }}
                                        type= "submit" className=" w-[64px] h-[42px] bg-red-400 border border-gray-500 rounded-[10%] p-2 hover:bg-red-600">Delete</button>
                                </div>
                            </div>  
                        </div>
                    </div>
                )
                :
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-3/4 md:w-1/4">
                    <div className="flex flex-col border border-gray-500">
                        <div className="p-5">
                            <div className="flex border border-gray-500">
                                <label className="pr-5 pl-5" htmlFor="startDate">Start Date:</label>
                                <input type="date" id="startDate" onChange={handleStartDateChange} value={editStartDate} />   
                            </div>
                            <div className="flex border border-gray-500">
                                <label className="pr-7 pl-5" htmlFor="endDate">End Date:</label>
                                <input type="date" id="endDate" onChange={handleEndDateChange} value={editEndDate} />
                            </div>
                            <div className="pt-10">
                                <div className="flex border border-gray-500">
                                    <label className="pr-5 pl-5" htmlFor="startTime">Start Time:</label>
                                    <input type="time" id="startTime" onChange={handleStartTimeChange} value={editStartTime}  />
                                </div>
                                <div className="flex border border-gray-500">
                                    <label className="pr-7 pl-5" htmlFor="endTime">End Time:</label>
                                    <input type="time" id="endTime" onChange={handleEndTimeChange} value={editEndTime}   />   
                                </div>
                            </div>
                            <div className="pt-10">
                                <div className="flex flex-col border border-gray-500">
                                    <label className="pr-5 pl-0" htmlFor="description">Description:</label>
                                    <input
                                        type="text"
                                        id="description"
                                        className="w-[100dvw] h-[10dvh] p-2 border overflow-scroll"
                                        style={{ whiteSpace: 'normal' }}
                                        onChange={handleDescriptionChange} 
                                        value={editDescription}
                                    />
                                </div>
                            </div>
                            <div className="pt-10">
                                <div>
                                    <label className="pr-9" htmlFor="colorPicker">Choose a Color:</label>
                                    <input type="color" id="colorPicker" onChange={handleColorChange} value={editColor}  />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type= "submit" value=" " className="border border-gray-500 rounded-[10%] p-2 hover:bg-gray-300">Submit</button>
                            </div>
                        </div>  
                    </div>
                </form>
                }
            </div>
        )
    }
}