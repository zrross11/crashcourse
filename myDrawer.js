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
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function CustomDrawerContent(props) {
    // console.log("Custom props",props);
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

class MyDrawer extends React.Component {
  
    constructor(props){
      super(props)
      this.state = {
        username: this.props.username,
        password: this.props.password,
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        loggedIn: this.props.loggedIn,
        schedule: this.props.schedule,
        departments: this.props.departments,
        classPool: this.props.classPool,
        retrievedSchedule: this.props.retrievedSchedule,
        courses: this.props.courses,
        show: this.props.show,
        classes: this.props.classes,
        selectedDepartment: this.props.selectedDepartment,
        filterResults: this.props.filterResults,
      }
    //   console.log("myDrawer.js: checking for classPool", this.state.classPool)
    }
      
    //   this.handler = this.handler.bind(this)
    // }
  
    handler(childState) {
      // this.setState({ username: childState.username })
      // this.setState({ password: childState.password })
      // this.setState({ email: childState.email })
      // this.setState({ firstName: childState.firstName })
      // this.setState({ lastName: childState.lastName })
      // this.setState({ loggedIn: childState.loggedIn })
      // this.setState({ schedule: childState.schedule })
      // this.setState({ retrievedSchedule: childState.retrievedSchedule })
      // this.setState({ courses: childState.courses })
      // this.setState({ show: childState.show })
      // this.setState({ classes: childState.classes })
      // this.setState({ selectedDepartment: childState.selectedDepartment })
          this.setState((state, props) => ({
              ...state, username: childState.username, show: 1, password: childState.password, email: childState.email, firstName: childState.firstName, lastName: childState.lastName,
        loggedIn: childState.loggedIn, schedule: childState.schedule, retrievedSchedule: childState.retrievedSchedule, courses: childState.courses, show: childState.show, 
          }));
      // console.log("childState", ...childState)
      console.log("App.js: handler just got called", this.state.classes)
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
      // console.log("Department shouldve just been set", this.state.departments)
  
        // console.log("This just logged in")
        // console.log("This props", this.props)
        if(this.props.loggedIn){
  
        //   console.log("App.js: Got into it", store.getState())
          return (
            
              <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} >
                <Drawer.Screen name={`${this.props.firstName}'s Schedule`} children={() => (<HomeScreen/>)} />
                <Drawer.Screen name="Add Class" children={() => (<AddScreen/>)} />
                {/* <Drawer.Screen name="Drop Class" children={() => (<RemoveScreen {...this.state} updateUser={this.handler} />)} /> */}
                <Drawer.Screen name="Profile" children={() => (<ProfileScreen {...this.state} updateUser={this.handler} />)} />
              </Drawer.Navigator>            
          )
        }
        else{
          return(
            <Drawer.Navigator >
              <Drawer.Screen name="Login Page" children={() => (<LoginScreen/>)} />
              <Drawer.Screen name="Sign Up" children={() => (<SignUpScreen/>)} />
            </Drawer.Navigator>             
          )
        }
        
    }
  }
  
  function mapStateToProps(state) {
    return {
      username: state.username,
      password: state.password,
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      loggedIn: state.loggedIn,
      schedule: state.schedule,
      retrievedSchedule: state.retrievedSchedule,
      show: state.show,
      selectedDepartment: state.selectedDepartment,
      classes: state.classes,
      classPool: state.classPool,
      departments: state.departments,
      courses: state.courses,
      filterResults: state.filterResults,
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item}),
      decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
      loadClasses: (item) => dispatch({type: 'LOAD_CLASSES', payload: item}),
      addClasses: (item) => dispatch({type: 'ADD_CLASSES', payload: item})
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyDrawer);