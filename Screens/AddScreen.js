import Filters from "../App/Filters/";
import SearchResults from "../App/SearchResults/"
import * as React from 'react'
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';
import { classExtractor } from '../App/CourseRoster';
import SemesterMapper from '../App/Semester';
import populateClass from '../ExtraCode'
import { StackRouter } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import {connect} from 'react-redux'

const Stack = createStackNavigator();
class AddScreen extends React.Component {

    constructor(props) {
		super(props)

        this.state = {
            // username: this.props.username,
            // password: this.props.password,
            // email: this.props.email,
            // firstName: this.props.firstName,
            // lastName: this.props.lastName,
            // loggedIn: this.props.loggedIn,
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
        // console.log("AddScreen.js: props",this.props.retrievedSchedule)
        // this.flip = this.flip.bind(this)
    //   console.log("addScreen.js: checking for classPool", this.state.classPool)
      // this.flipFilter = this.flipFilter.bind(this)
        this.addClasses = this.addClasses.bind(this)
        this.addClass = this.addClass.bind(this)
    }


	async addClass(key){
		console.log("Clicked class ",key)
		// Call the populate class method on the course
		var sched = this.state.retrievedSchedule // map holding each date in the semester and the array of clases on it 
		console.log("Sched", sched)
		var {semester, semesterDays } = SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		console.log("Semester",semester)
		populateClass(key, semester, sched)

		this.setState((state, props) => ({...state, retrievedSchedule: sched}));
		// this.props.updateUser(this.state)
        this.props.loadClasses(this.state)
		// Update the schedule mapper for the agenda 

	}

    async addClasses(item){
        console.log("AddScreen.js: addClasses was hit and called", item)
		// Call the populate class method on the course
		var sched = {} // map holding each date in the semester and the array of clases on it 
		console.log("Sched", sched)
		var {Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		// console.log("Semester",Semester)
		var newSched = populateClass(item, Semester, sched)
		this.setState((state, props) => ({
			...state, retrievedSchedule: newSched
		 }));
         console.log("AddScreen.js: New Sched", newSched)
		// this.props.loadClasses(this.state)
    }

    render(){
        // if(this.state.retrievedSchedule)
        // console.log("AddScreen.js: State new sched", this.state.retrievedSchedule)

        // console.log("Add Screen retrieved Sched", this.props)
            // console.log("Why the fuck is show positive")

        return (
            <Stack.Navigator>
                <Stack.Screen name="Filter Page" component={Filters}/>
                <Stack.Screen name="Search Results" component={SearchResults}/>
            </Stack.Navigator>
        )
        //     if(!this.state.show)
        //     return (
        //         <Filters />
        //     )
        // else {
        //     return (
        //         <SearchResults/>
        //     )
        // }

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
  )(AddScreen);