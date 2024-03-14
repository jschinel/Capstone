import React from "react"
import Day from "./day"

export default function Month({month,userEvents,setDisplayModal, getData}){
    return(
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row,i)=>(
                <React.Fragment key={i}>
                    {row.map((day,idx)=>(
                        <Day day={day} key={idx} rowIdx={i} userEvents={userEvents} month={month} setDisplayModal={setDisplayModal} getData={getData}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}