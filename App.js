import * as React from 'react';
import { StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Card, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native';
import './App/CourseRoster'
import { classExtractor } from './App/CourseRoster';
import SemesterMapper from './App/Semester';
import LoginScreen from './Screens/UserLoginScreen';
import SignUpScreen from './Screens/UserSignupScreen';
import HomeScreen from './Screens/HomeScreen';
import MyDrawer from './myDrawer'
import AddScreen from './Screens/AddScreen';
import RemoveScreen from "./Screens/RemoveScreen";
import ProfileScreen from './Screens/ProfileScreen'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("xMmrJFN7JLMXS1OvngDZsKisDGA3yff56HQI0Kv2", "5jpYBbBMdI4FIcvtxYlgekUeeeR4AoMVK69SfkfF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';


var testEvents = {}
var courses = {}

async function doStuff() {
  courses = await classExtractor();
  semester = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7));

  var list = []
  for (var key of Object.keys(courses)) {
    list.push(key)
  }
}


function CustomDrawerContent(props) {
  // console.log("Custom props",props);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const {classList, dept} = fillClass();
// console.log("App.js: classList const", classList)
// Initial User Account state 
const initialState = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  loggedIn: false,
  departments: dept, // Holds the list of searchable departments
  schedule: {}, // Stores the object key for user's schedule item
  retrievedSchedule: {}, // Stores the schedule of all semester days in array
  classes: [],
  classPool: classList, // Holds the list of all classes
  courses: [],
  show: 0,
  selectedDepartment: '',
  filterResults: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN':
          console.log("App.js: State has registered login")
          return { ...state, ...action.payload }
      case 'LOAD_CLASSES':
        console.log("App.js: Loading Classes up")
        return { ...state, ...action.payload }
      case 'ADD_CLASSES':
        console.log("App.js: Adding a class to schedule")
        return addClass(state, action.payload)
      case 'DECREASE_COUNTER':
          return { counter: state.counter - 1 }
      case 'TOGGLE_SHOW':
        return {...state, show: action.payload }
      case 'REMOVE_CLASSES':
          console.log("App.js: Removing a class from schedule")
          return {...state, ...action.payload}
      default:
        return state;

  }
  return state
}

function addClass(state, newClass){
  console.log("App.js: addClass newclass param", newClass)
  return {...state}
  // return {...state, classes: [...state.classes, { newClass }] }; 
}


const store = createStore(reducer)


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>      
    </Provider>

  );
}
function fillClass(){
var datad = require('./api.json')
    datad = datad.class_schedules.records
    // console.log("headers", datad.class_schedules.columns)
    var map = {}
    var customMap = {} // only tracks some choice classes
    //console.log(datad[0])
    // console.log(datad);
    var course;
  
    // ---- UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
    var free = ['AFFL', 'CE']
    // var free = ['APMA', 'CS', 'BME', 'CHEM', 'AFFL']
  
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
  
  // ----   UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
      // console.log(`Name: ${classObject.subject}`)
      if (free.includes(`${classObject.subject}`)){
        // console.log("e school course!",classObject)
        if( name in customMap){
          var sectionArray = customMap[name]
          sectionArray.push(classObject)
          customMap[name] = sectionArray
        }
        else{
          // console.log("E school new course found") // It does find all the e school courses
          customMap[name] = [classObject]
        }
      }
    }
      var classList = customMap ;
      var dept = []
      
      console.log("myDrawer.js: Classes were just populated into the pool")
              for (var key of Object.values(classList)) {
              if (!dept.includes(key[0].subject)) {
                  dept.push(key[0].subject)
              }
              // if (!professors.includes(key[0].instructor)) {
              // 	professors.push(key[0].instructor)
              // }
              // if (!meetingdays.includes(key[0].days)) {
              // 	meetingdays.push(key[0].days)
              // }
          }
          dept.sort()
          // professors.sort()
          // meetingdays.sort()
      // console.log("Dept after its sorted", dept)
      // console.log("App.js: lassList", classList )
          return {classList, dept};
}
  

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
});