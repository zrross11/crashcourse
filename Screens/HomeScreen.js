import {StyleSheet, View, Text, ImageBackground} from 'react-native';
  import * as React from 'react'
  import {Agenda} from 'react-native-calendars'
  import { Card, Icon } from 'react-native-elements'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import Parse from 'parse/react-native';
  import '../App/CourseRoster'
  import { connect } from 'react-redux'
  Parse.setAsyncStorage(AsyncStorage);

  Parse.initialize("mACzMiXlQTl8YbFXSMB7MCyhlXQinlAyS4FVg0k1","VS0yWbPQcLuBK8EgKRfBr6LiRoMdpSU2ZQjzIqvV"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = 'https://parseapi.back4app.com/';



class HomeScreen extends React.Component {

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
        }
	}

  fixTime(time) {
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

    render(){
        return (
            <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundImage}> 
            <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center'}}>
            <View
							style={{
								flex: 0.15,
							}} />
            <Agenda theme={{backgroundColor: 'transparent', calendarBackground: "white", agendaDayTextColor: "white", agendaDayNumColor:"white"}}
                    // The list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key has to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    // items={events}
                    items={this.props.retrievedSchedule}
                    minDate={'2021-08-24'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2021-12-07'}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={12}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={5}
                    // onDayPress={(day)=>{console.log(`day pressed: ${day.month}/${day.day}/${day.year}`)}}
                    renderItem={(item, firstItemInDay) => { 
                      if (item.days != "") {
                        return (
                      // courses.map((item) => {
                        // console.log("List of classes?",obj)
                        // return (
                          <Card>
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ flexDirection: "column", margin: "1%" }}>
                                <Text>{item.subject}{item.mnemonic}: {item.title} <Text style={{fontSize: 6}}> {item.number}</Text></Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={{ fontSize: 10 }}> Professor: {item.instructor}</Text>
                              {/* <View style={{ flexDirection: "column", marginLeft: "15%" }}>
                                <Text style={{ fontSize: 10 }}> Avg GPA: {item.gpa ? item.gpa : 0}</Text>
                              </View> */}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 10 }}> Time: {this.fixTime(item.start)} - {this.fixTime(item.end)}</Text>
                              </View>
                            </View>
                          </Card>                      
                        // );
                      // })
                    )} else {
                      return (
                        <Card>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flexDirection: "column", margin: "1%" }}>
                            <Text>{item.subject}{item.mnemonic}: {item.title}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 10 }}> Professor: {item.instructor}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontSize: 10 }}>Time: Online</Text>
                          </View>
                        </View>
                      </Card> 
                      )
                    }}}
                    renderEmptyDate={() => {return (<View/>);}}
                    // minDate={'2021-09-22'}
                    firstDay={1}
                    style={{width: 400}}
                    />
            </View>
            </ImageBackground>
        
          );
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
    LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item}),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
    loadClasses: (item) => dispatch({type: 'LOAD_CLASSES', payload: item})
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "white",
    },
  });