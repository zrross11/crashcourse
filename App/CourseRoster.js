import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native'

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("qQmbI9viEPskRUGExxKPYz228jjZPSiDTtbIWE7Z","hBHFZOryVQndv55vmvMArFBPLqjXLz6RGgp4GKiE"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

const url = 'https://api.devhub.virginia.edu/v1/courses/';

/**
 * This method parses through a json object that was pulled from the UVA course list API and places all classes into a map
 * @returns A hashmap with keys representing the class subject and mnemonic and values containing the sections and information for the class
 */
export async function classExtractor(){
  // var datad = await fetch(url)
	// .then((resp) => resp.json())
  // .catch(function(error) {
	// 	console.log('Fetch failed!');
	// });
  var datad = require('../api.json')
  datad = datad.class_schedules.records
  // console.log("headers", datad.class_schedules.columns)
  var map = {}
  console.log(datad[0])
  // console.log(datad);
  var course;
  for(var index = 0; index < datad.length; index++){
    course = datad[index];
    var name = `${course[0]}${course[1]}`
    // if(index === 15000)
    //   console.log("Checking parse length",  name)
    // console.log(course)
    var classObject = {
      subject: course[0],
      mnemonic: course[1],
      section: course[2],
      number: course[3],
      title: course[4],
      desc: course[5],
      instructor: course[6],
      capacity: course[7],
      days: course[8], // 'MTWRF'
      start: course[9],
      end: course[10], // 'HH:MM:SS' 24hr
      term: course[11], // '1216
      termdesc: course[12], // '2021 Summer'
    }
    // await saveCourse(classObject)
    if( name in map){
      var sectionArray = map[name]
      sectionArray.push(classObject)
      map[name] = sectionArray
    }
    else{
      map[name] = [classObject]
    }
  }

  return map;

}

async function saveCourse(course){
  var obj = new Parse.Object("Class");
  // console.log(courses);
  // for(var course of courses){
    // if(course !== undefined){  
      // console.log(course)
      obj.set("subject", course.subject)
      obj.set("mnemonic", course.mnemonic)
      obj.set("section", course.section)
      obj.set("number", course.number)
      obj.set("title", course.title)
      obj.set("desc", course.desc)
      obj.set("instructor", course.instructor)
      obj.set("capacity", course.capacity)
      obj.set("days", course.days) // 'MTWRF'
      obj.set("start", course.start)
      obj.set("end", course.end) // 'HH:MM:SS' 24hr
      obj.set("term", course.term) // '1216
      obj.set("termdesc", course.termdesc)

      try{
        let result = await obj.save();
        // alert(`Class ${course.subject}${course.mnemonic} created. `)
      }
      catch(error){
        // alert(`Failed to create Class ${course.subject}${course.mnemonic}`)
        console.log("Saving the class failed",error)
      }
    // }
  // }

}

export default {classExtractor};