import * as React from 'react';
import {StyleSheet, Image, View, ScrollView, Text, Button, ImageBackground, Dimensions, Row, Col} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import RemoveClasses from "./App/RemoveClasses/";
import Filters from "./App/Filters/";
import SearchResults from "./App/SearchResults/"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import { Card, Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
var url = 'https://api.devhub.virginia.edu/v1/courses/';

async function getCourses(){
  // var datad = await fetch(url)
	// .then((resp) => resp.json())
  // .catch(function(error) {
	// 	console.log('Fetch failed!');
	// });
  var datad = require('./api.json')
  // console.log("headers", datad.class_schedules.columns)
  var map = {}
  console.log(JSON.parse(JSON.stringify(datad.class_schedules.records))[3000])

  // console.log("DATA!!!",datad)
  // console.log("headers", datad.class_schedules.records[0])
  // console.log("headers", datad.class_schedules.records[1])
  // console.log("headers", datad.class_schedules.records[2])
  console.log("100!!!\n\n", JSON.stringify(datad.class_schedules.records[100]));
  console.log("200!!!\n\n", JSON.stringify(datad.class_schedules.records[200]));
  console.log("400!!!\n\n", JSON.stringify(datad.class_schedules.records[400]));
  console.log("1000!!!\n\n", JSON.stringify(datad.class_schedules.records[1000]));
  console.log("3000!!!\n\n", JSON.stringify(datad.class_schedules.records[3000]));
  console.log("Size of all records.", datad.class_schedules.records.length)

  for(var courseRecord = 0 ; courseRecord < datad.class_schedules.records.length; courseRecord++){
    var course = JSON.parse(JSON.stringify(datad.class_schedules.records))[courseRecord];
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
    };
    if( `${course[0]}${course[1]}` in map){
      var sectionArray = map[`${course[1]}${course[2]}`]
      // await sectionArray.push(classObject)
      map[`${course[0]}${course[1]}`] = sectionArray
    }
    else{
      map[`${course[0]}${course[1]}`] = [classObject]
    }
  }
  // var k = datad.class_schedules.records)
  // console.log(map)
  return map;
};
// console.log("CourseList",courseList)
// var courseList = await getCourses();
// getCourses();

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
        console.log(error)
      }
    // }
  // }

}
//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("qQmbI9viEPskRUGExxKPYz228jjZPSiDTtbIWE7Z","hBHFZOryVQndv55vmvMArFBPLqjXLz6RGgp4GKiE"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';


var testEvents = {}
var count = 0;
async function doThis(){
  var courseList = await getCourses();
  let keysList = [];
  console.log("COURSE LIST 3000!",courseList)
  for (let key in courseList)
    keysList.push(key);
  // console.log(keysList);
  for (var d = new Date(2021, 9, 1); d <= (new Date(2022,1,30)); d.setDate(d.getDate() + 1)) {
    var keys = `${d.getFullYear()}-${("0" + (d.getMonth())).slice(-2)}-${("0" + d.getDate()).slice(-2)}`.toString();
    if(courseList[`${keysList[count]}`] !== undefined){
      testEvents[`${keys}`] = courseList[`${keysList[count]}`]
      saveCourse(testEvents[`${keys}`])
    }
    count += 1
    // testEvents["2021-09-23"] = {title: "Boom Baby", gpa: "3.5"}
  }
  // console.log(JSON.stringify(testEvents))
  // console.log(testEvents);
}
doThis();
// console.log("testEvent",testEvents,testEvents.length)
// useState

function Feed({ navigation }) {


  return (
    <ImageBackground source={require('./assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
    <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
    <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            // items={events}
            items={testEvents}
            // onDayPress={(day)=>{console.log(`day pressed: ${day.month}/${day.day}/${day.year}`)}}
            renderItem={(item, firstItemInDay) => {return (<Card>
            <View style={{flexDirection: "row"}}>
              <View style={{flexDirection: "column", margin: "0"}}>
                <Text>{item.subject}{item.mnemonic}: {item.title}</Text>
              </View>

            </View>  
            <View style={{flexDirection: "row"}}>
              <Text style ={{fontSize:10}}> Professor: {item.instructor}</Text>
              <View style={{flexDirection: "column", marginLeft: "15%"}}>
                <Text style={{fontSize: 10}}> Avg GPA: {item.gpa? item.gpa : 0}</Text>
              </View>
            </View>
            <View style={{flexDirection: "row"}}>
              <View style={{flexDirection: "column"}}>
                <Text style={{fontSize: 10}}> Days: {item.days}</Text>
              </View>
            </View>
            </Card>);}}
            renderEmptyDate={() => {return (<View />);}}
            // minDate={'2021-09-22'}
            firstDay={1}
            style={{width: 400}}

            />
    </View>
    
    </ImageBackground>

  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator()

function AddClasses() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Classes" component={Filters} options={{headerShown: false}}/>
      <Stack.Screen name="Available" component={SearchResults} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Zach's Schedule" component={Feed} />
      <Drawer.Screen name="Add Class" component={AddClasses} />
      <Drawer.Screen name="Drop Class" component={RemoveClasses} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  
  return (
    // <ScrollView>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
   // </ScrollView> 
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
});