const initialState = {
    counter: 0
  }
  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Login':
            return { counter: state.counter + 1 }
        case 'DECREASE_COUNTER':
            return { counter: state.counter - 1 }
    }
    return state
  }
  
  // const store = createStore(reducer)
  
  // const CurrentUser = Parse.User.current();
  // const schedules = new Parse.Query(Parse.Object.extend('Schedule'))
  
  // // Update Class Schedule 
  // schedules.get(`${CurrentUser.schedule}`)
  // console.log('Schedule Link',CurrentUser.schedule)
  // .then((sched) => {
  //   // The object was retrieved successfully and it is ready to update.
  //   sched.set('Classes', [courses['CS4740'][0],courses['APMA3080'][2],courses['AAS150'][0]])
  // }, (error) => {
  //   // The object was not retrieved successfully.
  //   console.log('Failed to update ?')
  // });
  
  // var CurrentSchedule = schedules.get(`${CurrentUser.schedule}`)
  
  // populateClass(courses['CS4740'][0],semester)
  // populateClass(courses['STS4500'][0],semester)
//   populateClass(courses['APMA3080'][4],semester)
  // populateClass(courses[''][0],semester)
//   }
  
//   doStuff()
  
  export default function populateClass(course,semesterMap, testEvents){
    // var testDates = {}
    // Each letter in course.days corresponds to another day
    // console.log(`${course.subject}${course.mnemonic}: ${course.days}`)
    for(var ind of course.days){
      // console.log("Day of the week", ind)
      switch(ind){
        case 'M': // Monday
          for(var date of semesterMap['M']){
            // console.log("Monday dates",date)
            if(testEvents[`${date}`]){
              var temp = testEvents[`${date}`]
              temp.push(course)
              testEvents[`${date}`] = temp
              // console.log(testEvents[`${date}`])
            }
            else{
              testEvents[`${date}`] = [course]
              // console.log(testEvents[`${date}`])
            }
          }
          break
        case 'T': // Tuesday
          for(var date of semesterMap['T']){
            // console.log("Tuesday dates",date)
            if(testEvents[`${date}`]){
              var temp = testEvents[`${date}`]
              temp.push(course)
              testEvents[`${date}`] = temp
              // console.log(testEvents[`${date}`])
            }
            else{
              testEvents[`${date}`] = [course]
              // console.log(testEvents[`${date}`])
  
            }
          }
          break            
        case 'W': // Wednesday
          for(var date of semesterMap['W']){
            // console.log("Wed dates",date)
            if(testEvents[`${date}`]){
              var temp = testEvents[`${date}`]
              temp.push(course)
              testEvents[`${date}`] = temp
            }
            else{
              testEvents[`${date}`] = [course]
  
            }      
          }
          break
        case 'R': // Thursday
          for(var date of semesterMap['R']){
            // console.log("Thursday dates",date)
            if(testEvents[`${date}`]){
              var temp = testEvents[`${date}`]
              temp.push(course)
              testEvents[`${date}`] = temp
            }
            else{
              testEvents[`${date}`] = [course]
  
            }       
          }
          break
        case 'F': // Friday
          for(var date of semesterMap['F']){
            // console.log("Friday dates",date)
            if(testEvents[`${date}`]){
              var temp = testEvents[`${date}`]
              temp.push(course)
              testEvents[`${date}`] = temp
            }
            else{
              testEvents[`${date}`] = [course]
  
            }       
          }
          break
      }
    }
  }
  