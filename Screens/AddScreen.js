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
        }
        this.handler = this.handler.bind(this)

    }

    handler(childState){
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
        // console.log("App handler just got called", this.state)
      }

    render(){
        if(!this.state.show){
            return(
                <Filters {...this.state} updateUser={this.handler}/>
            )
        }
        else{
            return (
            <SearchResults {...this.state} updateUser={this.handler}/>
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
