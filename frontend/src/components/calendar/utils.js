import dayjs from 'dayjs'


export function getMonth(monthNum,yearIndex){

    if(monthNum>=0 && monthNum<12)
    {
        let month = monthNum
        const year = yearIndex
        const firstDayOfTheMonth = dayjs(new Date(year, month , 1)).day()
        let currentMonthCount = 0 - firstDayOfTheMonth
        const daysMatrix = new Array(5).fill([]).map(()=>{
            return new Array(7).fill(null).map(()=>{
                currentMonthCount++
                return dayjs(new Date(year, month, currentMonthCount))
            })
        })
        return daysMatrix
    }
    else{
        let month = dayjs().month()
        const year = yearIndex
        const firstDayOfTheMonth = dayjs(new Date(year, month , 1)).day()
        let currentMonthCount = 0 - firstDayOfTheMonth
        const daysMatrix = new Array(5).fill([]).map(()=>{
            return new Array(7).fill(null).map(()=>{
                currentMonthCount++
                return dayjs(new Date(year, month, currentMonthCount))
            })
        })
        return daysMatrix
    }
}