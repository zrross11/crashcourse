import * as React from 'react';
import {StyleSheet, Image, View, ScrollView, Text, Button, ImageBackground, Dimensions, Row, Col} from 'react-native';
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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import { Card, Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';



let { width } = Dimensions.get('window')

const url = 'https://api.devhub.virginia.edu/v1/courses/';

// console.log(datad)
async function api_call(){
  var datad = await fetch(url)
	.then((resp) => resp.json())
  .catch(function(error) {
		console.log('Fetch failed!');
	});
  console.log("headers", datad.class_schedules.columns)
  var map = {}
  console.log("headers", datad.class_schedules.records[0])
  console.log("headers", datad.class_schedules.records[1])
  console.log("headers", datad.class_schedules.records[2])

  for(var course of datad.class_schedules.records){
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
    if( `${course[0]}${course[1]}` in map){
      var sectionArray = map[`${course[1]}${course[2]}`]
      // await sectionArray.push(classObject)
      map[`${course[0]}${course[1]}`] = sectionArray
    }
    else{
      map[`${course[0]}${course[1]}`] = [classObject]
    }
  }
  // var k = datad.class_schedules.records)
  console.log(map)

}

api_call();

const events = {
  '2021-09-21': [],
  '2021-09-22': [{ start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Cloud Computing', gpa: '4.2' },{ start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Mobile App Development', gpa: '2.8' },{ start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Database Systems', gpa: '3.4' }],
  '2021-09-23': [{ start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Sun Tzu', gpa: '3.45' },{ start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Sociology of the Family', gpa: '1.6' }],
  '2021-09-24': [{ start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Robotics', gpa: '3.8' }],
  '2021-09-25': [{ start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Cell Biology', gpa: '3.7' }],
  '2021-09-26': [{ start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Physics II', gpa: '2.4' }],
  '2021-09-27': [{ start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Software Development Methods', gpa: '3.9' }],
  '2021-09-27': [{ start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Capstone Technical Report', gpa: '3.2' }],
  '2021-09-28': [{ start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Thermodynamics', gpa: '2.6' }],
  '2021-09-29': [{ start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'ENGR Lab', gpa: '2.1' }],
  '2021-09-30': [{ start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'ENGR Lecture', gpa: '3.8' }]
}

var testEvents = {}

for (var d = new Date(2021, 8, 1); d <= (new Date(2021,9,30)); d.setDate(d.getDate() + 1)) {
  var keys = `${d.getFullYear()}-${("0" + (d.getMonth())).slice(-2)}-${("0" + d.getDate()).slice(-2)}`.toString()
  // console.log(keys)
  testEvents[`${keys}`] = [{title: "Cloud Comp d", gpa: '4.5'}]
  // testEvents["2021-09-23"] = {title: "Boom Baby", gpa: "3.5"}
}
// console.log("testEvent",testEvents,testEvents.length)
// useState
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
            // onDayPress={(day)=>{console.log(`day pressed: ${day.month}/${day.day}/${day.year}`)}}
            renderItem={(item, firstItemInDay) => {return (<Card><Text>{item.title}</Text><View style={{flexDirection: "row"}}><Text style={{fontSize: 10}}> Avg GPA: {item.gpa}</Text></View></Card>);}}
            renderEmptyDate={() => {return (<View />);}}
            // minDate={'2021-09-22'}
            firstDay={1}
            style={{width: 400}}

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

const Stack = createStackNavigator()

function AddClasses() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Filters} />
      <Stack.Screen name="RemoveClasses" component={SearchResults} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Zach's Schedule" component={Feed} />
      <Drawer.Screen name="Add Class" component={AddClasses} options={{headerShown: false}} />
      <Drawer.Screen name="Drop Class" component={RemoveClasses} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  
  return (
    // <ScrollView>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
   // </ScrollView> 
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
});