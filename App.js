import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native';
import './App/CourseRoster'
import MyDrawer from './myDrawer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { doc, setDoc, updateDoc } from "@react-native-firebase/firestore"; 
// import { initializeApp } from 'firebase/app';
// import db from './FirebaseStore'
import * as firebase from 'firebase';
import 'firebase/firestore';

// import '@firebase/firestore';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDgoN3UkyY6sOdbiG6xUCmob8LOJMnSilI",
  authDomain: "crashcourse-fbe28.firebaseapp.com",
  projectId: "crashcourse-fbe28",
  storageBucket: "crashcourse-fbe28.appspot.com",
  messagingSenderId: "426889603056",
  appId: "1:426889603056:web:8fd59c3dd588c61d79df35",
  measurementId: "G-X668CGVTHD"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();


Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("xMmrJFN7JLMXS1OvngDZsKisDGA3yff56HQI0Kv2", "5jpYBbBMdI4FIcvtxYlgekUeeeR4AoMVK69SfkfF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

let classList, dept, profs, times;
console.log("App.js: classList const", classList)
// Initial User Account state 
var initialState = {
  // State elements that are stored in our database to be reloaded and updated by the currently logged in user
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  schedule: {}, // Stores the object key for user's schedule item -- W/ firebase, this is the user uid -- deprecated
  retrievedSchedule: {}, // Stores the schedule of all semester days in array

  // Firebase Backend Attributes that must follow
  uid: '', // Unique ID for every User on app

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
    case 'POPULATE_FILTERS':
      return { ...state, ...action.payload }
    case 'LOGOUT':
      console.log("App.js: Logging out of account. Saving state of store")
      return {...initialState}
    default:
      return state;

  }
}

function addClass(state, newClass) {
  // console.log("App.js: addClass newclass param", newClass)
  return { ...state, ...newClass }
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


