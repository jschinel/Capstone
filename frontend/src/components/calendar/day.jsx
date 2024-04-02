import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getUserEvents } from "../../../utils/backend";
import EventModalEditDelete from './eventModalEditDelete'

export default function Day({getData, day, rowIdx, userEvents, month}) {
    const [event1Display,setEvent1Display]=useState([])
    const [event2Display,setEvent2Display]=useState('none')
    const [event3Display,setEvent3Display]=useState('none')
    const [event4Display,setEvent4Display]=useState('none')
    const [event1Color,set1EventColor]=useState('none')
    const [event2Color,set2EventColor]=useState('none')
    const [event3Color,set3EventColor]=useState('none')
    const [event4Color,set4EventColor]=useState('none')
    const [event1Data,setEvent1Data]=useState('none')
    const [event2Data,setEvent2Data]=useState('none')
    const [event3Data,setEvent3Data]=useState('none')
    const [event4Data,setEvent4Data]=useState('none')
    const [displayEditModal, setDisplayEditModal]=useState('none')
    const [modalData, setModalData]=useState()

    function getCurrentDayClass(){
        return day.format("DD-MM-YY")=== dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7 text-center' : ''
    }

    useEffect(()=>{
        setEvent1Display('none')
        setEvent2Display('none')
        setEvent3Display('none')
        setEvent4Display('none')
        let n=0;
        for(let i = 0 ; i <= userEvents.length-1 ; i++)
        {
            let startDateFormated=userEvents[i].startDate
            startDateFormated = startDateFormated.replaceAll("-","")
            let endDateFormated=userEvents[i].endDate
            endDateFormated = endDateFormated.replaceAll("-","", i)
            if(startDateFormated <= (day.format("YYYYMMDD")) && (day.format("YYYYMMDD")) <= endDateFormated)
            {
                if(n==0)
                {
                    setEvent1Display('block')
                    set1EventColor(userEvents[i].color)
                    setEvent1Data(userEvents[i])
                }
                if(n==1)
                {
                    setEvent2Display('block')
                    set2EventColor(userEvents[i].color)
                    setEvent2Data(userEvents[i])
                }
                if(n==2)
                {
                    setEvent3Display('block')
                    set3EventColor(userEvents[i].color)
                    setEvent3Data(userEvents[i])
                }
                if(n==4)
                {
                    setEvent4Display('block')
                    set4EventColor(userEvents[i].color)
                    setEvent4Data(userEvents[i])
                }
                n++
            }
        }
    },[month,day])
    // console.log(userEvents)
    // console.log(event2Display)
    // let Testing=userEvents[0].startDate
    // Testing = Testing.replaceAll("-","")
    // console.log(Testing)
    console.log(day.$D)
    console.log(event1Data)
    return(
        <div className="border border-gray-200 flex flex-col">
            <header className=" flex flex-col items-center">
                {rowIdx===0 ? (
                <p className="text-sm mt-1">
                    {day.format('ddd')}
                </p>):null}
                <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
                <div className="w-full flex flex-col gap-1 text-center ">
                    <div className="truncate w-min-0" onClick={()=>{
                        setModalData(event1Data)
                        setDisplayEditModal('block')}
                    }
                    style={{display:event1Display, backgroundColor:event1Color}}><span>{event1Data.description}<br /></span></div>
                    <div className="truncate w-min-0" onClick={()=>{
                        setModalData(event2Data)
                        setDisplayEditModal('block')}
                    } 
                        style={{display:event2Display, backgroundColor:event2Color}}><span>{event2Data.description}<br /></span></div>
                    <div className="truncate w-min-0" onClick={()=>{
                        setModalData(event3Data)
                        setDisplayEditModal('block')}
                    }
                        style={{display:event3Display, backgroundColor:event3Color}}><span>{event3Data.description}<br /></span></div>
                    <div className="truncate w-min-0" onClick={()=>{
                        setModalData(event4Data)
                        setDisplayEditModal('block')}
                    }    
                    style={{display:event4Display, backgroundColor:event4Color}}><span>{event4Data.description}<br /></span></div>
                </div>
            </header>
            {modalData ? (
                <div style={{display: displayEditModal}}>
                    <EventModalEditDelete getData={getData} displayEditModal={displayEditModal} setDisplayEditModal={setDisplayEditModal} eventData={modalData}></EventModalEditDelete>
                </div>
            )
            :null}
        </div>
    )
}