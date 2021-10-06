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
import UserLogInPage from './UserLogin';
import UserSignUp from './UserSignUp';
// import { Provider } from 'react-redux'
// import { createStore} from 'redux'
import * as SecureStore from 'expo-secure-store';

Parse.setAsyncStorage(AsyncStorage);


Parse.initialize("mACzMiXlQTl8YbFXSMB7MCyhlXQinlAyS4FVg0k1","VS0yWbPQcLuBK8EgKRfBr6LiRoMdpSU2ZQjzIqvV"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';


var testEvents = {}
var courses = {}
var semester;

async function doStuff() {
  courses = await classExtractor();
  semester = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7));

  var list = []
  for (var key of Object.keys(courses)) {
    list.push(key)
  }

  var count = 0;


const initialState = {
  counter: 0
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'Login':
          return { counter: state.counter + 1 }
      case 'DECREASE_COUNTER':
          return { counter: state.counter - 1 }
  }
  return state
}

// const store = createStore(reducer)

// const CurrentUser = Parse.User.current();
// const schedules = new Parse.Query(Parse.Object.extend('Schedule'))

// // Update Class Schedule 
// schedules.get(`${CurrentUser.schedule}`)
// console.log('Schedule Link',CurrentUser.schedule)
// .then((sched) => {
//   // The object was retrieved successfully and it is ready to update.
//   sched.set('Classes', [courses['CS4740'][0],courses['APMA3080'][2],courses['AAS150'][0]])
// }, (error) => {
//   // The object was not retrieved successfully.
//   console.log('Failed to update ?')
// });

// var CurrentSchedule = schedules.get(`${CurrentUser.schedule}`)

// populateClass(courses['CS4740'][0],semester)
// populateClass(courses['STS4500'][0],semester)
populateClass(courses['APMA3080'][4],semester)
// populateClass(courses[''][0],semester)
}

doStuff()

export { courses }

async function populateClass(course, semesterMap) {
  // Each letter in course.days corresponds to another day
  // console.log(`${course.subject}${course.mnemonic}: ${course.days}`)
  for(var ind of course.days){
    // console.log("Day of the week", ind)
    switch(ind){
      case 'M': // Monday
        for (var date of semesterMap['M']) {
          // console.log("Monday dates",date)
          if (testEvents[`${date}`]) {
            var temp = testEvents[`${date}`]
            temp.push(course)
            testEvents[`${date}`] = temp
            // console.log(testEvents[`${date}`])
          }
          else {
            testEvents[`${date}`] = [course]
            // console.log(testEvents[`${date}`])
          }
        }
        break
      case 'T': // Tuesday
        for (var date of semesterMap['T']) {
          // console.log("Tuesday dates",date)
          if (testEvents[`${date}`]) {
            var temp = testEvents[`${date}`]
            temp.push(course)
            testEvents[`${date}`] = temp
            // console.log(testEvents[`${date}`])
          }
          else {
            testEvents[`${date}`] = [course]
            // console.log(testEvents[`${date}`])

          }
        }
        break
      case 'W': // Wednesday
        for (var date of semesterMap['W']) {
          // console.log("Wed dates",date)
          if (testEvents[`${date}`]) {
            var temp = testEvents[`${date}`]
            temp.push(course)
            testEvents[`${date}`] = temp
          }
          else {
            testEvents[`${date}`] = [course]

          }
        }
        break
      case 'R': // Thursday
        for (var date of semesterMap['R']) {
          // console.log("Thursday dates",date)
          if (testEvents[`${date}`]) {
            var temp = testEvents[`${date}`]
            temp.push(course)
            testEvents[`${date}`] = temp
          }
          else {
            testEvents[`${date}`] = [course]

          }
        }
        break
      case 'F': // Friday
        for (var date of semesterMap['F']) {
          // console.log("Friday dates",date)
          if (testEvents[`${date}`]) {
            var temp = testEvents[`${date}`]
            temp.push(course)
            testEvents[`${date}`] = temp
          }
          else {
            testEvents[`${date}`] = [course]

          }
        }
        break
    }
  }
}

function Feed({ navigation }) {
  return (
    <ImageBackground source={require('./assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
    <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
    <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            // items={events}
            items={testEvents}
            minDate={'2021-08-24'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2021-12-07'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={12}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={5}
            // onDayPress={(day)=>{console.log(`day pressed: ${day.month}/${day.day}/${day.year}`)}}
            renderItem={(item, firstItemInDay) => { return (
              // courses.map((item) => {
                // console.log("List of classes?",obj)
                // return (
                  <Card>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column", margin: "1%" }}>
                        <Text>{item.subject}{item.mnemonic}: {item.title}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 10 }}> Professor: {item.instructor}</Text>
                      <View style={{ flexDirection: "column", marginLeft: "15%" }}>
                        <Text style={{ fontSize: 10 }}> Avg GPA: {item.gpa ? item.gpa : 0}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 10 }}> Days: {item.days}</Text>
                      </View>
                    </View>
                  </Card>                      
                // );
              // })
            )
          }}
          renderEmptyDate={() => { return (<View />); }}
          // minDate={'2021-09-22'}
          firstDay={1}
          style={{ width: 400 }}
        />
      </View>
    </ImageBackground>

  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
function AddItem(item) {
  item.map(obj => {

  })

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

const  UserLoginScreen = ({onLogin}) => {
  // const theRef = React.forwardRef(null)
  return (
    <ImageBackground source={require('./assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
     <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
     <SafeAreaView >
         <View style={{margin: "0%", padding: "0%", marginTop: "-10%"}}>
           <Image
            resizeMode='contain'
            style={{alignContent: 'center',width: "70%", height: "70%", margin: "0%", marginLeft: "15%", marginTop: "-10%"}}
            source={require('./assets/images/crash-course-logo.png')}
           />
           <Text style={{margin: "0%"}}>
             <Text >
               {'Crash Course -'}
             </Text>
             {' UVA Course Scheduling'}
           </Text>
         </View>
         <UserLogInPage   />
       </SafeAreaView>
     </View>
    </ImageBackground>
    )
}

const UserSignUpScreen = (props) => {

  return (
    <ImageBackground source={require('./assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
     <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
     <SafeAreaView >
         <View style={{margin: "0%", padding: "0%", marginTop: "-10%"}}>
           <Image
            resizeMode='contain'
            style={{alignContent: 'center',width: "70%", height: "70%", margin: "0%", marginLeft: "15%", marginTop: "-10%"}}
            source={require('./assets/images/crash-course-logo.png')}
           />
           <Text style={{margin: "0%"}}>
             <Text >
               {'Crash Course -'}
             </Text>
             {' UVA Course Scheduling'}
           </Text>
         </View>
         <UserSignUp />
       </SafeAreaView>
     </View>
    </ImageBackground>
    )
}

function CustomDrawerContent(props) {
  // console.log("Custom props",props);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
            <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Zach's Schedule" component={Feed} />
      <Drawer.Screen name="Add Class" component={AddClasses} />
      <Drawer.Screen name="Drop Class" component={RemoveClasses} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}


// const MainStackNavigator = ({login}) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#9AC4F8",
//         },
//         headerTintColor: "white",
//         headerBackTitle: "Back",
//       }}
//     >
//      <Stack.Screen name="Login Page" onLogin={login} component={UserLoginScreen}/>
//       <Stack.Screen name="Sign Up" component={UserSignUpScreen}/>
//       <Stack.Screen name="Zach's Schedule" component={Feed} />
//       <Stack.Screen name="Add Class" component={AddClasses} />
//       <Stack.Screen name="Drop Class" component={RemoveClasses} />
//       <Stack.Screen name="Profile" component={Profile} />
//     </Stack.Navigator>
//   );
// }

const  InitialDrawer = (props) => {
// console.log("Drawer props",props);
  // SecureStore.deleteItemAsync('token')

  // setLogIn(true);
  const handleUser = (data) => {
    console.log("About to change our shit.")
    props.User.setUser(data.user)
    props.Schedule.setSchedule(data.schedule)
    props.Login.setLogIn(data.login)
  };


  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} >
      {/* <Drawer.Screen name="Login Page" onChange={handleUser} props={props} component={UserLoginScreen}/> */}
      {/* <Drawer.Screen name="Login Page" onChange={handleUser} props={props} logThis={handleUser} component={UserLoginScreen}/> */}
      <Drawer.Screen name="Login Page" component={UserLoginScreen}/>
      <Drawer.Screen name="Sign Up" component={UserSignUpScreen}/>
    </Drawer.Navigator>
  );
}



export default function App() {
  const [isLoggedIn, setLogIn] = React.useState(false)
  const [schedule, setSchedule] = React.useState({})
  const [user, setUser] = React.useState({})
  var count = 0;


  async function getUser(){
    let token = await SecureStore.getItemAsync('token')
    console.log(token);
    if(token != null){
      setLogIn(true);
      setUser(JSON.parse(token).user);
    }
    // setSchedule()
  }


  React.useEffect(() => {
    // if(count === 0){
    //   count += 1
    //   SecureStore.setItemAsync('token', JSON.stringify(null));
    // }
    // else{
      getUser();
    // }
  })
  

  if (isLoggedIn)
    return (
      // <ScrollView>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>        

    // </ScrollView> 
    );
  else{
    return (
        <NavigationContainer>
        <InitialDrawer props={isLoggedIn} User={setUser} Schedule={setSchedule} Login={setLogIn}/>
        </NavigationContainer>        

    )
  }
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
