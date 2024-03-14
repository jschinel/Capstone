import { useEffect, useState } from 'react'
import Header from './header'
import Month from './month'
import Sidebar from './sidebar'
import { getMonth } from './utils'
import dayjs from 'dayjs'
import EventModal from './eventModal'
import { getUserEvents } from "../../../utils/backend";

export default function Calendar(){

    const [currentMonth, setCurrentMonth]= useState()
    const [monthIndex, setMonthIndex]=useState(dayjs().month())
    const [yearIndex, setYearIndex]=useState(dayjs().year())
    const [displayModal, setDisplayModal]=useState('none')
    const [userEvents,setUserEvents]=useState()
    const [loadingComplete,setLoadingComplete]=useState(false)
    const [event1,setEvent1]=useState(localStorage.getItem("EventDate1"))
    const [event2,setEvent2]=useState(localStorage.getItem("EventDate2"))

    async function getData(){
        setLoadingComplete(false)
        const userData= await getUserEvents()
        setUserEvents(userData)
        setCurrentMonth(getMonth(monthIndex,yearIndex))
        setEvent1(localStorage.getItem("EventDate1"))
        setEvent2(localStorage.getItem("EventDate2"))
        setLoadingComplete(true)    
    }
    useEffect(()=>{
        getData();
    },[displayModal])

    useEffect(()=>{
        setCurrentMonth(getMonth(monthIndex,yearIndex))        
    },[monthIndex])
    // console.log(currentMonth)
    // console.log(monthIndex)
    // console.log(yearIndex)
    console.log(userEvents)
    if(loadingComplete==true)
    {
        return(
            <div className='h-screen flex flex-col bg-white'>
                <div style={{display:displayModal}}>
                    <EventModal setDisplayModal={setDisplayModal} event1={event1} event2={event2}></EventModal>               
                </div>
                <Header setMonthIndex={setMonthIndex} monthIndex={monthIndex} yearIndex={yearIndex} setYearIndex={setYearIndex}></Header>
                <div className='flex flex-1'>
                    <Sidebar setDisplayModal={setDisplayModal} month={monthIndex} year={yearIndex} setMonthIndex={setMonthIndex} setYearIndex={setYearIndex}></Sidebar>
                    <Month month = {currentMonth} userEvents={userEvents} setDisplayModal={setDisplayModal} getData={getData}></Month>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <h1>Loading Personal calendar</h1>            
        )
    }
}