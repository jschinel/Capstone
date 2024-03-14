import React, { useEffect, useState } from 'react'
import { getMonth } from './utils'
import dayjs from 'dayjs'

export default function Sidebar({month, year, setDisplayModal}){
    const [currentMonth, setCurrentMonth]= useState(getMonth())
    const [monthIndex, setMonthIndex]=useState(month)
    const [yearIndex, setYearIndex]=useState(year)
    const [daySelected, setDaySelected]=useState(0)
    const [selectedDay, setSelectedDay]=useState()
    const [secondDay, setSecondDay]=useState()
    useEffect(()=>{
        setMonthIndex(month)
        setYearIndex(year)
    },[month])
    
    useEffect(()=>{
        setCurrentMonth(getMonth(monthIndex,yearIndex))        
    },[monthIndex])

    function decrementMonth(){
        if(monthIndex!=0)
        {
            setMonthIndex(monthIndex-1)          
        }
        else{
            setYearIndex(yearIndex-1)
            setMonthIndex(11)
        }
    }
    function incrementMonth(){
        if(monthIndex<11)
        {
            setMonthIndex(monthIndex+1)         
        }
        else{
            setYearIndex(yearIndex+1)
            setMonthIndex(0)   
        }
    }
    function getDayClass(day){
        const format = "MMDDYY"
        const nowDay = dayjs().format(format)
        const currentDay = day.format(format)
        if(nowDay === currentDay){
            return 'bg-blue-500 text-white'
        }
        else if(nowDay != selectedDay && selectedDay === currentDay || ((currentDay >= selectedDay) && (currentDay <= secondDay)))
        {
            return 'bg-blue-300 text-black' 
        }
        else{
            return ""
        }
    }
    // console.log(selectedDay)
    return(
        <div className='flex flex-col items-center'>
            <div className='pt-10'>
                <button className='border border-gray-300 p-2 rounded-full flext items-center shadow-md hover:bg-gray-300' onClick={()=>{setDisplayModal('block')}}>
                    Create Event
                </button>
            </div>
            <div className='mt-9 p-5 w-[15dvw] border border-gray-300'>
                <header className='flex justify-between'>
                    <p className='text-gray-500 font-bold'>{dayjs(new Date(yearIndex,monthIndex)).format("MMMM YYYY")}</p>
                    <div>
                        <button onClick={decrementMonth}>
                            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                                &#11160;
                            </span>
                        </button>
                        <button onClick={incrementMonth}>
                            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                                &#11162;
                            </span>
                        </button>                        
                    </div>
                </header>
                <div className='grid grid-cols-7 grid-rows-6 border border-gray-300'>
                    {currentMonth[0].map((day,i)=> (
                        <span key={i} className='text-sm py-1 text-center border border-gray-300'>
                            {day.format('dd').charAt(0)}
                        </span>
                    ))}
                    {currentMonth.map((row,i)=> (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <button key={idx} className={`py-1 w-full border border-gray-300 ${getDayClass(day)}`} onClick={()=>
                                    {
                                        if(daySelected>=2)
                                        {
                                            setSecondDay()
                                            setSelectedDay()
                                            setDaySelected(0)
                                        }
                                        if(daySelected==0)
                                        {
                                            setSelectedDay(day.format("MMDDYY"))
                                            localStorage.setItem("EventDate1",day.format("YYYY-MM-DD"))
                                            setSecondDay(day.format("MMDDYY"))
                                            localStorage.setItem("EventDate2",day.format("YYYY-MM-DD"))
                                            setDaySelected(daySelected+1)
                                        }
                                        if((day.format("MMDDYY"))<selectedDay)
                                        {
                                            setSelectedDay(day.format("MMDDYY"))
                                            localStorage.setItem("EventDate1",day.format("YYYY-MM-DD"))
                                            setSecondDay(day.format("MMDDYY"))
                                            localStorage.setItem("EventDate2",day.format("YYYY-MM-DD"))
                                        }
                                        else
                                        {
                                            setSecondDay(day.format("MMDDYY"))
                                            setDaySelected(daySelected+1)
                                            localStorage.setItem("EventDate2",day.format("YYYY-MM-DD"))
                                            
                                        }
                                        if(daySelected>=2)
                                        {
                                            setSecondDay()
                                            setSelectedDay()
                                            setDaySelected(0)
                                        }                                    
                                    }
                                }>
                                    <span className='text-sm'>
                                        {day.format('D')}
                                    </span>
                                </button>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>

    )
}