
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
    var testDates = testEvents
    if(course.days == ''){
      console.log("ExtraCode.js: populateClass - class is online")
      for(var date of semesterMap['Sunday']){
        if(testEvents[`${date}`]){
          var temp = testEvents[`${date}`]
          temp.push(course)
          testEvents[`${date}`] = temp
        }
        else{
          testEvents[`${date}`] = [course]
        }       
      }   
    }

    for(var ind of course.days){
      switch(ind){

        case 'M': // Monday
          for(var date of semesterMap['M']){
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
        case 'T': // Tuesday
          for(var date of semesterMap['T']){
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
        case 'W': // Wednesday
          for(var date of semesterMap['W']){
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
    return testEvents;
  }
  
export function depopulateClass(course,semesterMap, testEvents){
    var testDates = testEvents
    // console.log("ExtraCode.js: initial testDates", testDates)
    // Each letter in course.days corresponds to another day
    // console.log(`${course.subject}${course.mnemonic}: ${course.days}`)
    if(course.days == ''){
      console.log("ExtraCode.js: populateClass - class is online")
      for(var date of semesterMap['Sunday']){
        if(testEvents[`${date}`]){
          var list = testEvents[`${date}`]
          for ( var classObj of list){
            if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
              list.splice(list.indexOf(classObj,1))
            }
          }
          testEvents[`${date}`] = list     
        }   
      }
    }
    for(var ind of course.days){
      // console.log("Day of the week", ind)
      switch(ind){
        case 'M': // Monday
          for(var date of semesterMap['M']){ // Goes through every Monday in the map of school days
            // console.log("Monday dates",date)
            if(testEvents[`${date}`]){ // If the date exists -- which it always should 
              var list = testEvents[`${date}`] // Grabs the list of classes that are in it
              for ( var classObj of list){ // Searches through the list for the current class and then breaks the for loop
                if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
                  list.splice(list.indexOf(classObj,1))
                  break
                }
              }
              testEvents[`${date}`] = list // updates the list and continues for each day of the week in the class
              // console.log(testEvents[`${date}`])
            }
          }
          break
        case 'T': // Tuesday
          for(var date of semesterMap['T']){
            // console.log("Tuesday dates",date)
            if(testEvents[`${date}`]){
              var list = testEvents[`${date}`]
              for ( var classObj of list){
                if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
                  list.splice(list.indexOf(classObj,1))
                }
              }
              testEvents[`${date}`] = list
              // console.log(testEvents[`${date}`])
            }
          }
          break            
        case 'W': // Wednesday
          for(var date of semesterMap['W']){
            // console.log("Wed dates",date)
            if(testEvents[`${date}`]){
              var list = testEvents[`${date}`]
              for ( var classObj of list){
                if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
                  list.splice(list.indexOf(classObj,1))
                }
              }
              testEvents[`${date}`] = list
              // console.log(testEvents[`${date}`])
            }  
          }
          break
        case 'R': // Thursday
          for(var date of semesterMap['R']){
            // console.log("Thursday dates",date)
            if(testEvents[`${date}`]){
              var list = testEvents[`${date}`]
              for ( var classObj of list){
                if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
                  list.splice(list.indexOf(classObj,1))
                }
              }
              testEvents[`${date}`] = list
              // console.log(testEvents[`${date}`])
            } 
          }
          break
        case 'F': // Friday
          for(var date of semesterMap['F']){
            // console.log("Friday dates",date)
            if(testEvents[`${date}`]){
              var list = testEvents[`${date}`]
              for ( var classObj of list){
                if(classObj.subject == course.subject || classObj.mnemonic == course.mnemonic || classObj.section == course.subject){
                  list.splice(list.indexOf(classObj,1))
                }
              }
              testEvents[`${date}`] = list
              // console.log(testEvents[`${date}`])
            }   
          }
          break
      }
    } // Closes for loop
    // console.log("ExtraCode.js: rrlast testDates depopulateClass", testEvents)
    return testEvents;
  }
