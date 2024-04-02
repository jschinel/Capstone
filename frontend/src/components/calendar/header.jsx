import dayjs from "dayjs";

export default function Header({setDisplayModal, setMonthIndex, monthIndex,setYearIndex, yearIndex}){
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
    function ResetIndex(){
            setMonthIndex(dayjs().month())         
            setYearIndex(dayjs().year())
    }
    return(
        <header className="flex flex-col justify-between">
            <div className="px-4 py-2 flex items-center w-full">
                <h1 className="md:mr-10 text-xl lg:text-5xl pr-5 text-gray-500 font-bold">Calendar</h1>
                <button onClick={ResetIndex} className="hidden md:flex border rounded py-2 px-4 mr-5">
                    Today
                </button>
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
                <h2 className="ml-4 text-md text-gray-500 font-bold">{dayjs(new Date(yearIndex, monthIndex)).format("MMMM YYYY")}</h2>
            </div>
            <div className='flex md:hidden justify-between justify-self-end py-2'>
                <button className=' text-xs p-2 justify-self-end border border-gray-300 rounded-[20%] flex items-center shadow-md hover:bg-gray-300' onClick={()=>{setDisplayModal('block')}}>
                    Create Event
                </button>
                <button onClick={ResetIndex} className="border rounded py-2 px-4 mr-5">
                    Today
                </button>
            </div>
        </header>    
    )
}