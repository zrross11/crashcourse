import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { connect } from 'react-redux';
import Parse from 'parse/react-native';
import * as firebase from 'firebase'

const db = firebase.firestore();
export class ProfileScreen extends React.Component {

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
			uid: this.props.uid,
		}
		this.logout = this.logout.bind(this)
	}


    componentDidMount(){
    }



	async logout(){
/*** 	BACK4APP LOGOUT
		const User = Parse.User.current(); 
		const query = new Parse.Query(User);

		try {
			User.set('retrievedSchedule',this.props.retrievedSchedule)
			await User.save();
			console.log("Finished saving info", this.props.retrievedSchedule)
			this.props.LOGOUT()
		}
		catch(error){
			console.log("Could not set and save the new schedule stuff",error)
		}
***/
		const usersRes = await db.collection('Users').doc(`${this.props.uid}`).set({...this.state});
		firebase.auth().signOut();
		this.props.LOGOUT()
	}

	render() {
		return (<View
			style={styles.DropView}>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					justifyContent: "center",
				}}>
				<Image
					source={require("./../assets/images/background.jpg")}
					style={styles.DropBackgroundMaskImage} />
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: "10%",
					width: "80%",
					top: "12%",
					bottom: "15%",
					alignItems: "flex-start",
				}}>
				<Text style={styles.profileText}>Username: </Text>
				<Text style={styles.profileText2}>{this.props.username}</Text>
				<View
					style={{
						flex: 0.05,
					}} />
				<Text style={styles.profileText}>Name: </Text>
				<Text style={styles.profileText2}>{this.props.firstName} {this.props.lastName}</Text>
				<View
					style={{
						flex: 0.05,
					}} />
				<Text style={styles.profileText}>Email: </Text>
				<Text style={styles.profileText2}>{this.props.email}</Text>
				<View
					style={{
						flex: 0.05,
					}} />
			</View>
			<View style={{ backgroundColor: "black", width: "30%", left: "35%", top: "45%", position: "relative" }}>
				<Button
					type="clear"
					title="Logout"
					color="#FFFF"
					onPress={this.logout}
				/>
			</View>
		</View>
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
	  filterResults: state.filterResults,
      retrievedSchedule: state.retrievedSchedule,
	  selectedDepartment: state.selectedDepartment,
	  selectedProfessor: state.selectedProfessor,
	  selectedDay:  state.selectedDay,
	  selectedTime: state.selectedTime,
	  classPool: state.classPool,
	  departments: state.departments,
	  professors: state.professors,
	  meetingTimes: state.meetingTimes,
	  className: state.className,
	  uid: state.uid,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item}),
      decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
      loadClasses: (item) => dispatch({type: 'LOAD_CLASSES', payload: item}),
      addClasses: (item) => dispatch({type: 'ADD_CLASSES', payload: item}),
	  toggleShow: (item) => dispatch({type: 'TOGGLE_SHOW', payload: item}),
	  LOGOUT: (item) => dispatch({ type: 'LOGOUT', payload: item}),

    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileScreen);


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
	},
	DropView: {
		backgroundColor: "white",
		flex: 1,
	},
	DropBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: '100%',
	},
	profileText: {
		fontSize: 25,
		fontWeight: "bold",
	},
	profileText2: {
		fontSize: 25,
	},
})
