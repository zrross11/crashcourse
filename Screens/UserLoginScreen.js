import * as React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Parse from 'parse/react-native';
import '../App/CourseRoster'
import { classExtractor } from '../App/CourseRoster';
import SemesterMapper from '../App/Semester';
import { connect } from 'react-redux';
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDgoN3UkyY6sOdbiG6xUCmob8LOJMnSilI",
  authDomain: "crashcourse-fbe28.firebaseapp.com",
  projectId: "crashcourse-fbe28",
  storageBucket: "crashcourse-fbe28.appspot.com",
  messagingSenderId: "426889603056",
  appId: "1:426889603056:web:8fd59c3dd588c61d79df35",
  measurementId: "G-X668CGVTHD"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();

class LoginScreen extends React.Component {

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
    this.doUserLogIn = this.doUserLogIn.bind(this)
    this.fillClass = this.fillClass.bind(this)
  }

  componentDidMount(){
    this.fillClass()
  }

  async fillClass() {
    var datad = require('../api.json')
    datad = datad.class_schedules.records
    // console.log("headers", datad.class_schedules.columns)
    var map = {}
    var customMap = {} // only tracks some choice classes

    var course;
  
    // FireBase Testing --- less than 10000 for it to update
    var count = 10001
  
    // ---- UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
    // var free = ['AFFL', 'CE']
    var free = ['APMA', 'CS', 'BME', 'CHEM', 'AFFL', 'PHYS', 'CE', 'MAE', 'STS',]
  
    for (var index = 0; index < datad.length; index++) {
      course = datad[index];
      var name = `${course[0]}${course[1]}`
      // if(index === 15000)
      //   console.log("Checking parse length",  name)
      // console.log(course)
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
      // await saveCourse(classObject)
  
      // ----   UNCOMMENT THIS FOR ONLY E SCHOOL TEST  -----
      // console.log(`Name: ${classObject.subject}`)
      if (free.includes(`${classObject.subject}`)) {
        // console.log("e school course!",classObject)
        if (name in customMap) {
          var sectionArray = customMap[name]
          sectionArray.push(classObject)
          customMap[name] = sectionArray
          if(count < 10000 && course[3] > 21370){
            // Add a new document in collection "Courses"
            let data = {
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
            const res = await db.collection('Courses').doc(`${course[3]}`).set(data);
            console.log("Should have logged a course")
            count++
          }
        }
        else {
          // console.log("E school new course found") // It does find all the e school courses
          customMap[name] = [classObject]
          if(count < 10000 && course[3] > 21370){
            // Add a new document in collection "Courses"
            let data = {
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
            const res = await db.collection('Courses').doc(`${course[3]}`).set(data);
            console.log("Should have logged a course")
            count++
          }
        }
      }
    }
    var classList = customMap;
    var dept = []
    var profs = []
    var times = []
  
    for (var key of Object.values(classList)) {
      for (var j = 0; j < key.length; j++) {
        if (!dept.includes(key[j].subject)) {
          dept.push(key[j].subject)
        }
        if (!profs.includes(key[j].instructor)) {
          profs.push(key[j].instructor)
        }
        if (!times.includes(key[j].start + " - " + key[j].end)) {
          times.push(key[j].start + " - " + key[j].end)
        }
      }
  
    }
    dept.sort()
    profs.sort()
    profs.shift()
    times.sort()

    for(var index in times) {
      var endtime = fixTime(times[index].substring(11,19))
      var begintime = fixTime(times[index].substring(0,8))
      times[index] = begintime + " - " + endtime
    }
    
    var ret = {
    departments: dept,
    professors: profs,
    classPool: classList,
    meetingTimes: times,
    }
    this.props.populate(ret)
  }

  async doUserLogIn() {

    // Note that these values come from state variables that we've declared before

/***  BACK4APP LOGIN
    const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        // logIn returns the corresponding ParseUser object
        //   Alert.alert(
        //     'Success!',
        //     `User ${loggedInUser.get('username')} has successfully signed in!`,
        //   );
          // To verify that this is in fact the current user, currentAsync can be used
          var currentUser = await Parse.User.currentAsync();
          if(currentUser === loggedInUser){
            // console.log("just firstname",currentUser.firstname);
            var k = JSON.parse(JSON.stringify(currentUser))
            // console.log("k value",k)
            // console.log("2",currentUser.get);
            // console.log("json parse",JSON.parse(currentUser));
            
              // console.log("UserLoginScreen.js : state",this.state)
              if(k.retrievedSchedule == undefined){
                this.setState({loggedIn: true, firstName: k.firstName, lastName: k.lastName, username: usernameValue, password: k.password, 
                  email: currentUser.getEmail(), schedule: k.schedule, retrievedSchedule: {}})                
              }
              else{
                this.setState({loggedIn: true, firstName: k.firstName, lastName: k.lastName, username: usernameValue, password: k.password, 
                  email: currentUser.getEmail(), schedule: k.schedule, retrievedSchedule: k.retrievedSchedule})
              }
              // var sched = this.getSchedule;
              // updateSchedule();
              // console.log("after updateSchedule", this.state.retrievedSchedule);
              // this.setState({retrievedSchedule: sched})
              // this.props.buildClasses();
              // console.log("The props", this.props)
          }
          // this.props.updateUser(this.state);

          // console.log("Logged In User & Current User are good.",loggedInUser === currentUser);
          this.props.LOGIN(this.state)
          return true;
        })
        .catch((error) => {
          console.log("Error trying to login",error)
          // Error can be caused by wrong parameters or lack of Internet connection
        //   Alert.alert('Error!', error.message);
        return false;
      });
***/

      const user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const users = userCredential.user;
        // console.log("Firebase User Account object",users)
        return users
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error w user login", error)
        // ..
      });
      console.log(user)
      const userRef = db.collection('Users').doc(`${user.uid}`);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        // console.log('Document data:', doc.data());
        this.props.LOGIN(doc.data())
      }
      
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password } = this.state;

    return (
      <ImageBackground source={require('../assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}>
        <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
          <SafeAreaView >
          {/* <KeyboardAvoidingView style={{flex: 1, padding: 0, margin: 0}} behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
            <View style={{ marginTop: "-10%" }}>
              <Image
                resizeMode='contain'
                style={{ alignContent: 'center', width: "70%", height: "70%", marginLeft: "15%", marginTop: "-20%" }}
                source={require('../assets/images/crash-course-logo.png')}
              />
              <Text style={styles.titleText}>
                {' UVA Course Scheduling'}
              </Text>
            </View>
            <View style={{ margin: "0%", padding: "0%", marginTop: "-35%" }}>
              <TextInput
                style={styles.input}
                value={email}
                placeholder={'Email'}
                onChangeText={(text) => this.setState((state, props) => ({ ...state, email: text }))}
                autoCapitalize={'none'}
              />
              <TextInput
                style={styles.input}
                value={password}
                placeholder={'Password'}
                secureTextEntry
                onChangeText={(text) => this.setState((state, props) => ({ ...state, password: text }))}
              />
              <View style={{ backgroundColor: "black", width: "30%", left: "66%", marginTop: "5%", position: "relative" }}>
                  <Button
                    type="clear"
                    title="Sign In"
                    color="#FFFF"
                    onPress={this.doUserLogIn}
                  />
                </View>
            </View>
            {/* </KeyboardAvoidingView> */}
          </SafeAreaView>
        </View>
      </ImageBackground>
    )
  }
}

function fixTime(time) {
  var tester = parseInt(time.substring(0,2))
  var half = " AM"
  if (tester >= 12) {
    half = " PM"
    if (tester > 12) {
      tester = tester - 12
    }
  }
  var output = tester + ":" + time.substring(3,5) + half
  return output
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
    populate: (item) => dispatch({ type: 'POPULATE_FILTERS', payload: item }),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    //   color: "white",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: "-8%"
  },
});
