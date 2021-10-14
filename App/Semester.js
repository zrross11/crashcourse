/**
 * 
 * @param {*} startDate : This is the start date of the semester
 * @param {*} endDate : This is the end date of the semester
 * @returns A hashmap of each date within the parameter range in its respective key,value pair for the corresponding day of the week that the date represents
 */
export async function SemesterMapper(startDate,endDate){
    var Semester = {
        "M": [],
        "T": [],
        "W": [],
        "R": [],
        "F": [],
        "Saturday": [],
        "Sunday": [],
    }

    var SemesterDays = {}

    for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        var currDate = `${date.getFullYear()}-${("0" + (date.getMonth()+ 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`.toString()
        if(currDate === '2022-00-07'){
            console.log('Dec 7? Month', date.getMonth())
            console.log('Dec 7? Year', date.getYear())
            console.log('Dec 7? Date', date.getDate())
        }
        SemesterDays[`${currDate}`] = [] // Creates empty list for each day in the semester for the calendar generator
        // console.log(currDate)
        var temp = [];
        switch(date.getDay()){
            case 0:
                // temp = Semester["Sunday"]
                // Semester["Sunday"] = temp.push(currDate)
                // console.log(temp)
                // console.log(typeof(temp),temp.length)
                break
            case 1:
                temp = Semester["M"]
                temp.push(currDate)
                // console.log("Monday",typeof(temp),temp.length)
                Semester["M"] = temp
                break
            case 2:
                temp = Semester["T"]
                temp.push(currDate)
                // console.log("Tues",typeof(temp),temp.length)
                Semester["T"] = temp
                break
            case 3:
                temp = Semester["W"]
                temp.push(currDate)
                // console.log("wed",typeof(temp),temp.length)
                Semester["W"] = temp
                break
            case 4:
                temp = Semester["R"]
                temp.push(currDate)
                // console.log("Thurs",typeof(temp),temp.length)
                Semester["R"] = temp
                break
            case 5:
                temp = Semester["F"]
                temp.push(currDate)
                // console.log("Fri",typeof(temp),temp.length)
                Semester["F"] = temp
                break
            case 6:
                // temp = Semester["Saturday"]
                // Semester["Saturday"] = temp.push(currDate)
                break
        }
      }
    //   console.log("Semester Mapper list of all days", SemesterDays)
    //   console.log(Semester)
      return {Semester, SemesterDays};
}

export default SemesterMapper;