import * as React from 'react';
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import RemoveClasses from "./App/RemoveClasses/";
import Filters from "./App/Filters/";
import SearchResults from "./App/SearchResults/"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Card, Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import AsyncStorage from '@react-native-community/async-storage'

import Parse from 'parse/react-native';
import './App/CourseRoster'
import { classExtractor } from './App/CourseRoster';
import SemesterMapper from './App/Semester';
import LoginScreen from './Screens/UserLoginScreen';
import SignUpScreen from './Screens/UserSignupScreen';
import HomeScreen from './Screens/HomeScreen';
import AddScreen from './Screens/AddScreen';
// import { Provider } from 'react-redux'
// import { createStore} from 'redux'
import * as SecureStore from 'expo-secure-store';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("xMmrJFN7JLMXS1OvngDZsKisDGA3yff56HQI0Kv2","5jpYBbBMdI4FIcvtxYlgekUeeeR4AoMVK69SfkfF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
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

  var count = 0;

var count = 0;
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator()

function AddClasses() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Classes" component={Filters} options={{ headerShown: false }} />
      <Stack.Screen name="Available" component={SearchResults} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
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
        schedule: {}, 
        retrievedSchedule: {},
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
    // console.log("App handler just got called", this.state)
  }

  render(){
    if(this.state.loggedIn){
    console.log("This just logged in",this.state)
    return (
      <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} >
      <Drawer.Screen name={`${this.state.firstName}'s Schedule`} children={() => (<HomeScreen {...this.state} updateUser={this.handler} />)} />
      <Drawer.Screen name="Add Class" children={() => (<AddScreen {...this.state} updateUser={this.handler} />)} />
      <Drawer.Screen name="Drop Class" component={RemoveClasses} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
    )}
    else{
      return (
        <Drawer.Navigator >
        <Drawer.Screen name="Login Page" children={() => (<LoginScreen {...this.state} updateUser={this.handler} />)} />
        <Drawer.Screen name="Sign Up" children={() => (<SignUpScreen {...this.state} updateUser={this.handler} />)}/>
      </Drawer.Navigator>
      )
    }
  }
}


export default function App() {
    return (
      // <ScrollView>
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>        

    // </ScrollView> 
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
      input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    //   color: "white",
      backgroundColor: "white",
    },
});
// }