import Filters from "../App/Filters/";
import SearchResults from "../App/SearchResults/"
import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import {connect} from 'react-redux'

const Stack = createStackNavigator();
class AddScreen extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
          schedule: this.props.schedule,
          departments: this.props.departments,
          professors: this.props.professors,
          meetingTimes: this.props.meetingTimes,
          classPool: this.props.classPool,
          retrievedSchedule: this.props.retrievedSchedule,
          selectedDepartment: this.props.selectedDepartment,
          filterResults: this.props.filterResults,
        }
    }


    render(){
        return (
            <Stack.Navigator screenOptions={{headerShown:  false}}>
                <Stack.Screen name="Filter Page" component={Filters} />
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
      selectedDepartment: state.selectedDepartment,
      filterResults: state.filterResults,
      classPool: state.classPool,
      departments: state.departments,
      professors: state.professors,
      meetingTimes: state.meetingTimes,
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