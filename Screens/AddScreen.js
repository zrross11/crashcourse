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
        this.addClasses = this.addClasses.bind(this)
        this.addClass = this.addClass.bind(this)
    }


    render(){
        return (
            <Stack.Navigator>
                <Stack.Screen name="Filter Page" component={Filters}/>
                <Stack.Screen name="Search Results" component={SearchResults}/>
            </Stack.Navigator>
        )
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
      addClasses: (item) => dispatch({type: 'ADD_CLASSES', payload: item}),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddScreen);