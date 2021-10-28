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
import MyDrawer from './myDrawer'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("xMmrJFN7JLMXS1OvngDZsKisDGA3yff56HQI0Kv2", "5jpYBbBMdI4FIcvtxYlgekUeeeR4AoMVK69SfkfF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

const { classList, dept, profs, times } = fillClass();
// console.log("App.js: classList const", classList)
// Initial User Account state 
const initialState = {
  // State elements that are stored in our database to be reloaded and updated by the currently logged in user
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  schedule: {}, // Stores the object key for user's schedule item
  retrievedSchedule: {}, // Stores the schedule of all semester days in array

 
  courses: [],

  // State attributes that are used for the class search feature
  classes: [], // Stores the classes that fit the search criteria
  selectedDepartment: '', // Stores chosen department in 
  filterResults: [],
  
  // State attributes that are constant and populates on initial start of the app
  loggedIn: false,
  departments: dept, // Holds the list of searchable departments
  professors: profs,
  meetingTimes: times,
  classPool: classList, // Holds the list of all classes
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
    case 'REMOVE_CLASSES':
      console.log("App.js: Removing a class from schedule")
      return { ...state, ...action.payload }
    case 'LOGOUT':
      console.log("App.js: Logging out of account. Saving state of store")
    default:
      return state;

  }
}

function addClass(state, newClass) {
  // console.log("App.js: addClass newclass param", newClass)
  return { ...state, ...newClass }
  // return {...state, classes: [...state.classes, { newClass }] }; 
}


function doLogout(state){


  return {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
    departments: dept, // Holds the list of searchable departments
    professors: profs,
    meetingTimes: times,
    schedule: {}, // Stores the object key for user's schedule item
    retrievedSchedule: {}, // Stores the schedule of all semester days in array
    classes: [],
    classPool: classList, // Holds the list of all classes
    courses: [],
    show: 0,
    selectedDepartment: '',
    filterResults: [],
  }
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
function fillClass() {
  var datad = require('./api.json')
  datad = datad.class_schedules.records
  // console.log("headers", datad.class_schedules.columns)
  var map = {}
  var customMap = {} // only tracks some choice classes
  //console.log(datad[0])
  // console.log(datad);
  var course;

  // ---- UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
  // var free = ['AFFL', 'CE']
  var free = ['APMA', 'CS', 'BME', 'CHEM', 'AFFL', 'PHYS', 'CE', 'MAE', 'STS']

  for (var index = 0; index < datad.length; index++) {
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
    if (free.includes(`${classObject.subject}`)) {
      // console.log("e school course!",classObject)
      if (name in customMap) {
        var sectionArray = customMap[name]
        sectionArray.push(classObject)
        customMap[name] = sectionArray
      }
      else {
        // console.log("E school new course found") // It does find all the e school courses
        customMap[name] = [classObject]
      }
    }
  }
  var classList = customMap;
  var dept = []
  var profs = []
  var times = []

  console.log("myDrawer.js: Classes were just populated into the pool")
  for (var key of Object.values(classList)) {
    for (var j = 0; j < key.length; j++) {
      if (!dept.includes(key[j].subject)) {
        dept.push(key[j].subject)
      }
      if (!profs.includes(key[j].instructor)) {
        profs.push(key[j].instructor)
      }
      if (!times.includes(key[j].start + " - " + key[j].end)) {
        times.push(key[j].start + " - " + key[j].end)
      }
    }

  }
  dept.sort()
  profs.sort()
  profs.shift()
  times.sort()
  return { classList, dept, profs, times };
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