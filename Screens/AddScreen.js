import RemoveClasses from "../App/RemoveClasses/";
import Filters from "../App/Filters/";
import SearchResults from "../App/SearchResults/"
import * as React from 'react'
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default class SignUpScreen extends React.Component {

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
            retrievedSchedule: this.props.retrievedSchedule,
            courses: [],
            show: 0,
            classes: [],
            selectedDepartment: '',
        }
        this.handler = this.handler.bind(this)
        this.flip = this.flip.bind(this)
        // this.getResults = this.getResults.bind(this)

    }

    // var classes = []
    // getResults() {
    // console.log("AddScreen state in getResults", this.state)
	// var k = this.state.classes
	// for (var key of Object.values(courses)) {
	// 	if (key[0].subject == selectedDepartment) {
	// 		for (var j = 0; j < key.length; j++) {
	// 			k.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
	// 		}
	// 	}
	// }
	// k.sort()
    // this.setState({classes: k})
    // this.updateUser(this.state)
    // }

    componentDidMount(){
        // this.getResults
    }

    handler(childState){
        console.log("AddScreen handler was called");
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
        // console.log("App handler just got called", this.state)
        this.props.updateUser(this.state)
      }

      flip(){
          this.setState({show: !this.state.show})
          this.setState({classes: []})
      }

    render(){
        if(!this.state.show){
            return(
                <Filters {...this.state} updateUser={this.handler}  />
            )
        }
        else{
            return (
            <SearchResults {...this.state} updateUser={this.handler} flipScreen={this.flip} />
            )
        }
        // return (
        //     <Stack.Navigator>
        //       <Stack.Screen name="Add Classes" children={() => <Filters {...this.state} updateUser={this.handler}/>}  options={{ headerShown: false }} />
        //       <Stack.Screen name="Available" children={() => <SearchResults {...this.state} updateUser={this.handler}/>} options={{ headerShown: false }} />
        //     </Stack.Navigator>
        //   );
    }
}
