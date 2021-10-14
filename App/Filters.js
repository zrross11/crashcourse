import * as React from "react";
import { Image, StyleSheet, Text, View, Button, TextInput, ImageBackground } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { classExtractor } from './CourseRoster';
import populateClass from '../ExtraCode'

var departments = ['APMA','CS','ETC']
var professors = []
var meetingdays = []
var locations = []


var courses = {}



export default class MainScreenTwo extends React.Component {

	constructor(props) {
		super(props)
		console.log("Filter.js: Constructor params", this.props.route.params)
		// console.log("Filter.js: Constructor params", this.props.route)
		// console.log("Filter.js: Constructor params", this.props)
		this.state = {
			username: this.props.route.params.username,
			password: this.props.route.params.password,
			email: this.props.route.params.email,
			firstName: this.props.route.params.firstName,
			lastName: this.props.route.params.lastName,
			loggedIn: this.props.route.params.loggedIn,
			schedule: this.props.route.params.schedule,
			retrievedSchedule: this.props.route.params.retrievedSchedule,
			courses: this.props.route.params.courses,
			show: this.props.route.params.show,
			selectedDepartment: this.props.route.params.selectedDepartment,
			classes: this.props.route.params.classes,
			classPool: this.props.route.params.classPool,
			departments: this.props.route.params.departments,
			addClass: this.props.route.params.addClass,
		}
		// console.log("Department in the filter object", this.state.departments)
		// departments = this.props.departments
		// console.log("Departments variable in filters", departments)
		// console.log("Departments props in filters", this.props.departments)
		this.filterCourses = this.filterCourses.bind(this)
		// this.getFilters = this.getFilters.bind(this)
		// this.getFilters();
	}


	// componentDidMount() {
	// 	console.log("Filters didmount being called")
	// 	this.getFilters();
	//  }

	//  async getFilters() {
	// async componentDidMount(){
	// 	console.log("getFilters was called and is about to populate")
	// 	// courses = await classExtractor();
	// 	console.log("getFilters was called and just populated")
	// 	// console.log("courses!",courses)
	// 	for (var key of Object.values(this.props.classPool)) {
	// 		if (!departments.includes(key[0].subject)) {
	// 			departments.push(key[0].subject)
	// 		}
	// 		if (!professors.includes(key[0].instructor)) {
	// 			professors.push(key[0].instructor)
	// 		}
	// 		if (!meetingdays.includes(key[0].days)) {
	// 			meetingdays.push(key[0].days)
	// 		}
	// 	}
	// 	departments.sort()
	// 	professors.sort()
	// 	meetingdays.sort()
	// }

	filterCourses() {
		// Filter results based on the filter query
		// Set the list of courses that fit the constraints in state 
		// Courses are being filtered
		// console.log("filter courses was called")
		// var courses = await classExtractor();
		// courses = await classExtractor();
		// console.log("courses finished.",this.state)
		var k = []

		// console.log("Filter k on filter courses", k, this.state)
		for (var key of Object.values(this.state.classPool)) {
			// console.log("What is key", key)
			if (key[0].subject == this.state.selectedDepartment) {
				for (var j = 0; j < key.length; j++) {
					k.push(key[j]);
					// console.log("What is key", key)

				}
			}
		}
		k = k.sort()
		// console.log("Fiter.js: Just sorted and stuff",k)
		// this.setState({classes: k})
		// this.setState({show: 1})
		this.setState((state, props) => ({
			...state, show: 1, classes: k
		 }));
	}

	render() {
		// console.log("Filter.js: state of filter courses -- just pressed show classes",this.props.route.params.classes)
		if(this.state.show)
				// return(
				this.props.navigation.push('Results', {
					...this.state
				})				
			// )

		// this.props.updateUser(this.state)
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
							data={this.state.departments}
							defaultButtonText={"Department"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								// console.log(selectedItem, index)
								this.setState({ selectedDepartment: selectedItem })
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
							data={departments}
							defaultButtonText={"Location"}
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
