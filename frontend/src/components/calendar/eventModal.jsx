import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {postEvent} from "../../../utils/backend"


export default function EventModal({setDisplayModal, event1, event2}) {
    console.log(localStorage.getItem("EventDate1")) 
    const navigate = useNavigate();

        const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Retrieve form data
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const description = document.getElementById('description').value;
        const color = document.getElementById('colorPicker').value;
    
        // Create an object to represent the event data
        const eventData = {
            startDate,
            endDate,
            startTime,
            endTime,
            description,
            color,
        };
        await postEvent(eventData)
        const userEvent = JSON.stringify(eventData)
        setDisplayModal('none')
    };
    // console.log(localStorage.getItem('eventData'))
    return(
        <div className="flex flex-col h-screen w-full fixed left-0 top-0 flex justify-center items-center border border-gray-500">
            <header className="w-1/4 bg-gray-100 px-4 py-2 flex justify-between items-center border border-gray-500">
                <span className="">
                    Calendar Event
                </span>
                <button onClick={()=>{setDisplayModal('none')}}>
                    close                
                </button>
            </header>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-1/4">
                <div className="flex flex-col border border-gray-500">
                    <div className="p-5">
                        <div className="flex border border-gray-500">
                            <label className="pr-5 pl-5" htmlFor="startDate">Start Date:</label>
                            <input type="date" id="startDate" defaultValue={event1} />   
                        </div>
                        <div className="flex border border-gray-500">
                            <label className="pr-7 pl-5" htmlFor="endDate">End Date:</label>
                            <input type="date" id="endDate" defaultValue={event2} />
                        </div>
                        <div className="pt-10">
                            <div className="flex border border-gray-500">
                                <label className="pr-5 pl-5" htmlFor="startTime">Start Time:</label>
                                <input type="time" id="startTime" defaultValue="12:00" />
                            </div>
                            <div className="flex border border-gray-500">
                                <label className="pr-7 pl-5" htmlFor="endTime">End Time:</label>
                                <input type="time" id="endTime" defaultValue="13:00" />   
                            </div>
                        </div>
                        <div className="pt-10">
                            <div className="flex flex-col border border-gray-500">
                                <label className="pr-5 pl-0" htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="w-full h-[10dvh] p-2 border overflow-scroll"
                                    style={{ whiteSpace: 'normal' }}
                                    placeholder="Enter text"
                                />
                            </div>
                        </div>
                        <div className="pt-10">
                            <div>
                                <label className="pr-9" htmlFor="colorPicker">Choose a Color:</label>
                                <input type="color" id="colorPicker" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type= "submit" defaultValue=" " className="border border-gray-500 rounded-[10%] p-2 hover:bg-gray-300">Submit</button>
                        </div>
                    </div>  
                </div>
            </form>
        </div>
    )
}