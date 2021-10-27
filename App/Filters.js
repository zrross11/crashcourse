import * as React from "react";
import { Image, StyleSheet, Text, View, Button, TextInput, ImageBackground } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { classExtractor } from './CourseRoster';
import populateClass from '../ExtraCode'
import { connect } from 'react-redux'
import store from '../App'

var professors = []
var meetingdays = []
var locations = []

class Filters extends React.Component {

	constructor(props) {
		super(props)
		// console.log("Filter.js: Constructor params", this.props.route.params)
		// console.log("Filter.js: Constructor params", this.props.route)
		// console.log("Filter.js: Constructor params", this.props)
		this.state = {
			// username: this.props.username,
			// password: this.props.password,
			// email: this.props.email,
			// firstName: this.props.firstName,
			// lastName: this.props.lastName,
			// loggedIn: this.props.loggedIn,
			schedule: this.props.schedule,
			retrievedSchedule: this.props.retrievedSchedule,
			courses: this.props.courses,
			show: 0,
			selectedDepartment: '',
			classes: [],
			classPool: this.props.classPool,
			departments: this.props.departments,
		}
    //   console.log("Filters.js: checking for classPool", this.state.classPool)
	  // console.log("Filters.js: State when constructed",this.props)
		this.filterCourses = this.filterCourses.bind(this)
	}


	filterCourses() {
		var k = []
		// console.log("Filters.js: filterCourses state", Object.values(this.state.classPool))
		console.log("Filter.js: filterCourses was called. About to enter for loop")
		for (var key of Object.values(this.state.classPool)) {
			console.log("Filters.js: filterCourses classPool keys",key)
			if (key[0].subject == this.state.selectedDepartment) {
				console.log("Subject was found")
				for (var j = 0; j < key.length; j++) {
					k.push(key[j]);
				}
			}
		}
		k = k.sort()
		this.props.loadClasses({classes: k})
		this.props.toggleShow(!this.props.show)
		this.props.navigation.navigate("Search Results")

	}

	render() {
		// const { departments } = this.props
		return (
			<ImageBackground source={require('../assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}>
				<View
					style={styles.mainScreenView}>
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
							style={styles.mainScreenBackgroundMaskImage} />
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: "10%",
							width: "80%",
							top: "5%",
							bottom: "5%",
							alignItems: "flex-start",
						}}>
						<Text style={styles.titleText}>What type of class?</Text>
						<SelectDropdown
							data={this.props.departments}
							defaultButtonText={"Department"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								this.setState((state,props) => ({...state, selectedDepartment: selectedItem }))
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
						<View
							style={{
								flex: 0.1,
							}} />
						<SelectDropdown
							data={professors}
							defaultButtonText={"Professor"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								console.log(selectedItem, index)
								// this.setState({professor: selectedItem})
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
						<View
							style={{
								flex: 0.1,
							}} />
						<SelectDropdown
							data={meetingdays}
							defaultButtonText={"Meeting Days"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								console.log(selectedItem, index)
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
						<View
							style={{
								flex: 0.1,
							}} />
						<SelectDropdown
							data={locations}
							defaultButtonText={"Location"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								// console.log(selectedItem, index)
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
						/>
						<View
							style={{
								flex: 0.3,
							}} />
						<Text style={styles.titleText2}>Search By Class Name:</Text>
						<TextInput style={styles.input} placeholder="Type here..." />

						<View
							style={{
								flex: 0.1,
							}} />
						<View style={{ backgroundColor: "black", left: "60%" }}>
							<Button
								type="clear"
								title="Show classes"
								color="#FFFF"
								onPress={this.filterCourses}
							/>
						</View>
					</View>
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
	  show: state.show,
	  selectedDepartment: state.selectedDepartment,
	  classes: state.classes,
	  classPool: state.classPool,
	  departments: state.departments,
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
  )(Filters);

const styles = StyleSheet.create({
	mainScreenView: {
		backgroundColor: "white",
		flex: 1,
	},
	mainScreenBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 814,
	},
	dropdown1BtnStyle: {
		width: "100%",
		height: "10%",
		backgroundColor: "#FFF",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#444",
	},
	titleText: {
		fontSize: 34,
		fontWeight: "bold",
	},
	titleText2: {
		fontSize: 29,
		fontWeight: "bold",
		color: "white"
	},
	input: {
		backgroundColor: "white",
		height: "5%",
		width: "100%",
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
	},
})
