import dayjs from "dayjs";

export default function Header({setMonthIndex, monthIndex,setYearIndex, yearIndex}){
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
        <header className="px-4 py-2 flex items-center">
            <h1 className="mr-10 text-5xl pr-5 text-gray-500 font-bold">Calendar</h1>
            <button onClick={ResetIndex} className="border rounded py-2 px-4 mr-5">
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
            <h2 className="ml-4 text-xl text-gray-500 font-bold">{dayjs(new Date(yearIndex, monthIndex)).format("MMMM YYYY")}</h2>
        </header>    
    )
}