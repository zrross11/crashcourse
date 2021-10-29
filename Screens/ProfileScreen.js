import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { connect } from 'react-redux';

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
			courses: this.props.courses,
		}
		this.handler = this.handler.bind(this)
		this.logout = this.logout.bind(this)
	}


    componentDidMount(){
    }

    async handler(childState){
        console.log("Profile handler was called");
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

	logout(){
		this.setState({loggedIn: !this.state.loggedIn})
		this.props.updateUser(this.state)
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
					<Text>{this.props.firstName}</Text>
					<Text>{this.props.lastName}</Text>
					<Text>{this.props.email}</Text>
			</View>
			<View style={{ backgroundColor: "black", width: "30%", left: "35%", top: "20%", position: "relative" }}>
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
	  className: state.className
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item}),
      decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
      loadClasses: (item) => dispatch({type: 'LOAD_CLASSES', payload: item}),
      addClasses: (item) => dispatch({type: 'ADD_CLASSES', payload: item}),
	  toggleShow: (item) => dispatch({type: 'TOGGLE_SHOW', payload: item})
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
	className: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: "2%"
	},
	details: {
		fontSize: 13,
		marginLeft: "2%"
	}
})
