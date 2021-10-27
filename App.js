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
import AddScreen from './Screens/AddScreen';
import RemoveScreen from "./Screens/RemoveScreen";
import ProfileScreen from './Screens/ProfileScreen'

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

class MyDrawer extends React.Component {
  static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state
    return {
      header: null,
      headerLeft: null,
      headerRight: null,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      loggedIn: false,
      departments: [], // Holds the list of searchable departments
      professors: [],
      schedule: {},
      retrievedSchedule: {},
      classes: [],
      classPool: [],

    }
    this.handler = this.handler.bind(this)
    this.buildClasses = this.buildClasses.bind(this);
  }

  handler(childState) {
    this.setState({ username: childState.username })
    this.setState({ password: childState.password })
    this.setState({ email: childState.email })
    this.setState({ firstName: childState.firstName })
    this.setState({ lastName: childState.lastName })
    this.setState({ loggedIn: childState.loggedIn })
    this.setState({ schedule: childState.schedule })
    this.setState({ retrievedSchedule: childState.retrievedSchedule })
    this.setState({ courses: childState.courses })
    this.setState({ show: childState.show })
    this.setState({ classes: childState.classes })
    this.setState({ selectedDepartment: childState.selectedDepartment })
    console.log("App.js: handler just got called", this.state.classes)
  }

  componentDidMount(){  
  var datad = require('./api.json')
  datad = datad.class_schedules.records
  // console.log("headers", datad.class_schedules.columns)
  var map = {}
  var customMap = {} // only tracks some choice classes
  //console.log(datad[0])
  // console.log(datad);
  var course;

  // ---- UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
  var free = ['APMA', 'CS', 'BME', 'CHEM', 'AFFL']

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
    var profs = []
    this.setState({classPool: classList})
    console.log("Classes were just populated into the pool")
    		for (var key of Object.values(classList)) {
			if (!dept.includes(key[0].subject)) {
				dept.push(key[0].subject)
			}
      for (var i = 0; i < key.length; i++) {
        if(!profs.includes(key[i].professor)) {
          profs.push(key[i].professor);
        }
      }
			// if (!professors.includes(key[0].instructor)) {
			// 	professors.push(key[0].instructor)
			// }
			// if (!meetingdays.includes(key[0].days)) {
			// 	meetingdays.push(key[0].days)
			// }
		}
		dept.sort()
    profs.sort()
    // console.log("Dept after its sorted", dept)
    this.setState({departments: dept})
    this.setState({professors: profs})
    console.log(profs)
    // console.log("Department shouldve just been set", this.state.departments)
  }

  // Populates the total list of classes after the user logs in
  buildClasses(){
    // var classList = classExtractor() ;
    // var dept = []
    // this.setState({classPool: classList})
    // console.log("Classes were just populated into the pool")
    // 		for (var key of Object.values(this.state.classPool)) {
		// 	if (!dept.includes(key[0].subject)) {
		// 		dept.push(key[0].subject)
		// 	}
		// 	// if (!professors.includes(key[0].instructor)) {
		// 	// 	professors.push(key[0].instructor)
		// 	// }
		// 	// if (!meetingdays.includes(key[0].days)) {
		// 	// 	meetingdays.push(key[0].days)
		// 	// }
		// }
		// dept.sort()
    // console.log("Dept after its sorted", dept)
    // this.setState({departments: dept})
    // console.log("Department shouldve just been called", this.state.departments)
		// // professors.sort()
		// // meetingdays.sort()
  }

  render() {

    if (this.state.loggedIn) {
      // console.log("This just logged in")
      return (
        <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} >
          <Drawer.Screen name={`${this.state.firstName}'s Schedule`} children={() => (<HomeScreen {...this.state} updateUser={this.handler} />)} />
          <Drawer.Screen name="Add Class" children={() => (<AddScreen {...this.state} updateUser={this.handler} />)} />
          <Drawer.Screen name="Drop Class" children={() => (<RemoveScreen {...this.state} updateUser={this.handler} />)} />
          <Drawer.Screen name="Profile" children={() => (<ProfileScreen {...this.state} updateUser={this.handler} />)} />
        </Drawer.Navigator>
      )
    }
    else {
      return (
        <Drawer.Navigator >
          <Drawer.Screen name="Login Page" children={() => (<LoginScreen {...this.state} updateUser={this.handler} buildClasses={this.buildClasses}/>)} />
          <Drawer.Screen name="Sign Up" children={() => (<SignUpScreen {...this.state} updateUser={this.handler} />)} />
        </Drawer.Navigator>
      )
    }
  }
}


export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
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