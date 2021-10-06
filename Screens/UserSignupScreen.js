import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';
import Parse from 'parse/react-native';
import '../App/CourseRoster'
import SemesterMapper from '../App/Semester'
import populateClass from   '../ExtraCode'
import { classExtractor } from '../App/CourseRoster';

// Parse.setAsyncStorage(AsyncStorage);

Parse.initialize("xMmrJFN7JLMXS1OvngDZsKisDGA3yff56HQI0Kv2","5jpYBbBMdI4FIcvtxYlgekUeeeR4AoMVK69SfkfF"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

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
            retrievedSchedule: {},
        }
        this.doUserSignup = this.doUserSignup.bind(this)

	}

    async doUserSignup(){
        // Note that these values come from state variables that we've declared before
        const {semester, semesterDays} = await SemesterMapper(new Date(2021,7,24),new Date(2021,12,7)); // returns a mapping of each date to the day AND a map of empty arrays for each date
        const courses = await classExtractor();
    
        var obj = new Parse.Object("Schedule");
        obj.set("Classes", semesterDays)
        var result = await obj.save();
    
    
        var user = new Parse.User();
        user.set("username", this.state.username);
        user.set("password", this.state.password);
        user.set("email", this.state.email);
        user.set("firstName", this.state.firstName);
        user.set("lastName", this.state.lastName);
        user.set("schedule", result.id); // ObjectID of this user's current schedule
        user.set("retrievedSchedule", semesterDays)
    

        await user.signUp().then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        }).catch(function(error){
            console.log("Error: " + error.code + " " + error.message);
        });
        populateClass()
        this.setState({retrievedSchedule: semesterDays})
        this.setState({loggedIn: true})
        this.setState({schedule: result.id})
        this.props.updateUser(this.state);
        // return await Parse.User.logIn(usernameValue, passwordValue)
        //   .then(async (loggedInUser) => {
        //     // logIn returns the corresponding ParseUser object
        //     Alert.alert(
        //       'Success!',
        //       `User ${loggedInUser.get('username')} has successfully signed in!`,
        //     );
        //     // To verify that this is in fact the current user, currentAsync can be used
        //     const currentUser = await Parse.User.currentAsync();
        //     console.log(loggedInUser === currentUser);
        //     return true;
        //   })
        //   .catch((error) => {
        //     // Error can be caused by wrong parameters or lack of Internet connection
        //     Alert.alert('Error!', error.message);
        //     return false;
        //   });
      };

    render(){
        return (
            <ImageBackground source={require('../assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
             <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
             <SafeAreaView >
                 <View style={{margin: "0%", padding: "0%", marginTop: "-10%"}}>
                   <Image
                    resizeMode='contain'
                    style={{alignContent: 'center',width: "70%", height: "70%", margin: "0%", marginLeft: "15%", marginTop: "-10%"}}
                    source={require('../assets/images/crash-course-logo.png')}
                   />
                   <Text style={{margin: "0%", marginTop: "-15%"}}>
                     <Text >
                       {'Crash Course -'}
                     </Text>
                     {' UVA Course Scheduling'}
                   </Text>
                 </View>
                 <View style={{margin: "0%", padding: "0%", marginTop: "-30%",}}>
                    <View style={{margin: "0%", padding: "0%", marginTop: "-5%"}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.username}
                        placeholder={'Username'}
                        onChangeText={(text) => this.setState({username: (text)})}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                    />
                    <TextInput          
                        style={styles.input}
                        value={this.state.password}
                        placeholder={'Password'}
                        secureTextEntry
                        onChangeText={(text) => this.setState({password: (text)})}
                    />
                    <TextInput          
                        style={styles.input}
                        value={this.state.email}
                        placeholder={'Email Address'}
                        
                        onChangeText={(text) => this.setState({email: (text)})}
                    />
                    <TextInput          
                        style={styles.input}
                        value={this.state.firstName}
                        placeholder={'First Name'}
                        
                        onChangeText={(text) => this.setState({firstName: (text)})}
                    />
                    <TextInput          
                        style={styles.input}
                        value={this.state.lastName}
                        placeholder={'Last Name'}
                        
                        onChangeText={(text) => this.setState({lastName: (text)})}
                    />
                    <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, width: "30%"}} onPress={this.doUserSignup}>
                        <View style={{borderColor: "white", }}>
                        <Button
                        onPress={this.doUserSignup}
                        title="Sign Up"
                        color="black"
                        backgroundColor="white"            
                        width="20%"
                        accessibilityLabel="Learn more about this purple button"
                        />
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
               </SafeAreaView>
             </View>
            </ImageBackground>
            )
    }
}
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
  });