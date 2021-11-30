import * as React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Parse from 'parse/react-native';
import '../App/CourseRoster'
import { classExtractor } from '../App/CourseRoster';
import SemesterMapper from '../App/Semester';
import { connect } from 'react-redux';


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
  }


  // SecureStore.deleteItemAsync('token')
  async getSchedule() {
    const schedules = new Parse.Query(Parse.Object.extend('Schedule'))

    // Update Class Schedule 
    var savedSched = await schedules.get(`${this.props.schedule}`)
    this.setState((state, props) => ({ ...state, schedule: savedSched }))
    return savedSched;
    // .then((sched) => {
    //     // The object was retrieved successfully and it is ready to update.
    //     // sched.set('Classes', [courses['CS4740'][0],courses['APMA3080'][2],courses['AAS150'][0]])
    //     // populateClass()
    // },
    //  (error) => {
    //     // The object was not retrieved successfully.
    //     console.log('Failed to update ?')
    // });
    // console.log('Schedule Link',savedSched) 
  }

  async updateSchedule() {
    console.log("updateSchedule was called!")
    const schedules = new Parse.Query(Parse.Object.extend('Schedule'))
    var courses = await classExtractor();
    const { Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // returns a mapping of each date to the day AND a map of empty arrays for each date
    // console.log("semestermapper 1",SemesterDays)

    // Update Class Schedule 
    var savedSched = await schedules.get(`${this.state.schedule}`)
    // .then((sched) => {
    // //     // The object was retrieved successfully and it is ready to update.
    // // var test = [courses['CS4740'][0],courses['APMA3080'][2],courses['AAS150'][0]]
    // var currentSched = this.state.retrievedSchedule
    // // populateClass()
    // console.log("semestermapper ",semesterDays)
    //     sched.set('Classes', semesterDays)
    //     // sched.set('Classes', [courses['CS4740'][0],courses['APMA3080'][2],courses['AAS150'][0]])
    //     sched.save()
    // //     console.log("parse.object",Parse.Object(sched))
    // //     var k = JSON.parse(JSON.stringify(sched))
    // //     console.log("k after parse string",k)
    // //     // populateClass(courses['CS4740'][0],semesterDays,k)
    // //     // populateClass(courses['APMA3080'][2],semesterDays,k)
    // //     // populateClass(courses['CS2150'][0],semesterDays,k)
    // //     console.log("K after populateClass", k)
    // this.setState({retrievedSchedule: semesterDays})
    // },
    //  (error) => {
    //     // The object was not retrieved successfully.
    //     console.log('Failed to update ?')
    // });
    this.setState({ retrievedSchedule: SemesterDays })

    console.log("savedSched", savedSched)
    // console.log('Schedule Link',savedSched) 
  }

  // console.log("Login??",props)
  async doUserLogIn() {
    // console.log("THIS",this)
    // console.log("State",this.props.navigation.getState())
    // console.log("the props",this.props)
    // Note that these values come from state variables that we've declared before
    const { Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // returns a mapping of each date to the day AND a map of empty arrays for each date

    const usernameValue = this.state.username;
    const passwordValue = this.state.password;
    // console.log("Inside of doUserLogIn")
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
  }

  render() {
    // if(this.state.loggedIn)
    const { loggingIn } = this.props;
    const { username, password } = this.state;

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
                value={username}
                placeholder={'Username'}
                onChangeText={(text) => this.setState((state, props) => ({ ...state, username: text }))}
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
