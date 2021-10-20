import Filters from "../App/Filters/";
import SearchResults from "../App/SearchResults/"
import * as React from 'react'
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';
import { classExtractor } from '../App/CourseRoster';
import SemesterMapper from '../App/Semester';
import populateClass from '../ExtraCode'
import { StackRouter } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default class AddScreen extends React.Component {

    constructor(props) {
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
            // classPool: [],
            retrievedSchedule: this.props.retrievedSchedule,
            courses: [],
            show: 0,
            classes: [],
            selectedDepartment: '',
            filterResults: [],
            addClass: this.addClasses,

        }
        this.handler = this.handler.bind(this)
        this.flip = this.flip.bind(this)
        this.flipFilter = this.flipFilter.bind(this)
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

		this.setState({retrievedSchedule: sched});
		this.props.updateUser(this.state)
		// Update the schedule mapper for the agenda 

	}
    handler(childState){
        // console.log("AddScreen.js:  handler was called. class array",childState.classes);
        // console.log("AddScreen.js:  handler was called. show",childState.show);
 
        if(childState.classes.length > 0){

        
        // this.setState(prevState => ({
        //     formData: {
        //       ...prevState.formData,
        //       ...childState
        //     }
        //   }));
        //   console.log("Entered",this.state)
                //   console.log("AddScreen handler just got called test", childState.classes)

        }
        this.setState({username: childState.username})
        this.setState({password: childState.password})
        this.setState({email: childState.email})
        this.setState({firstName: childState.firstName})
        this.setState({lastName: childState.lastName})
        this.setState({loggedIn: childState.loggedIn})
        this.setState({schedule: childState.schedule})
        this.setState({retrievedSchedule: childState.retrievedSchedule})
        this.setState({courses: childState.courses})
        this.setState({show: childState.show})
        this.setState({classes: childState.classes})
        this.setState({selectedDepartment: childState.selectedDepartment})
        this.setState({classPool: childState.classPool})
        console.log("AddScreen handler just got called: ", this.state.show)
        // this.props.updateUser(this.state)
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
		// this.props.updateUser(this.state)
    }

    render(){
        if(this.state.retrievedSchedule)
        console.log("Add Screen retrieved Sched", this.state.retrievedSchedule)
        return (
            <Stack.Navigator>
                <Stack.Screen name="Filters" component={Filters} initialParams={{...this.state}} options={{headerShown: false}}/>
                <Stack.Screen name="Results" component={SearchResults} options={{headerShown: false}}/>                
            </Stack.Navigator>
        )
    }
}
