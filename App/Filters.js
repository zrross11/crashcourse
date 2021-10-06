import * as React from "react";
import { Image, StyleSheet, Text, View, Button, TextInput, ImageBackground } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { classExtractor } from './CourseRoster';


var departments = []
var professors = []
var meetingdays = []
var locations = []

var selectedDepartment = ""

var courses = {}
async function getFilters() {
	courses = await classExtractor();

	for (var key of Object.values(courses)) {
		if (!departments.includes(key[0].subject)) {
			departments.push(key[0].subject)
		}
		if (!professors.includes(key[0].instructor)) {
			professors.push(key[0].instructor)
		}
		if (!meetingdays.includes(key[0].days)) {
			meetingdays.push(key[0].days)
		}
	}
	departments.sort()
	professors.sort()
	meetingdays.sort()
}
getFilters()

export default class MainScreenTwo extends React.Component {

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
			show: this.props.show,
			selectedDepartment: this.props.selectedDepartment,
			classes: this.props.classes,

		}
		this.filterCourses = this.filterCourses.bind(this)
	}


	componentDidMount() {

	}

	async filterCourses(){
		// Filter results based on the filter query

		// Set the list of courses that fit the constraints in state 

		// Courses are being filtered
		var courses = await classExtractor();

		// var k = []
		var k = this.props.classes

		// console.log("Filter k on filter courses", k, this.state)
		for (var key of Object.values(courses)) {
			if (key[0].subject == this.state.selectedDepartment) {
				for (var j = 0; j < key.length; j++) {
					k.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
				}
			}
		}
		k = k.sort()
		this.setState({classes: k})
		console.log("filterCourses state and then k",this.state.classes,k)
		console.log("Classes length", this.state.classes.length)
		// this.updateUser(this.state)

		this.setState({show: 1})
		
		this.props.updateUser(this.state)
		// console.log("Checking for navigation props",this.props.show)
		// console.log("Checking for navigation state",this.state.show)
		// this.props.navigation.navigate("Available")
	}

	render() {
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
							data={departments}
							defaultButtonText={"Department"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								console.log(selectedItem, index)
								this.setState({selectedDepartment: selectedItem})
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

export {selectedDepartment};

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
