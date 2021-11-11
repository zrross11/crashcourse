import * as React from "react";
import { Image, StyleSheet, Text, View, Button, TextInput, ImageBackground } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux'
 
const daymap = {
	'Monday': 'M',
	'Tuesday': 'T',
	'Wednesday': 'W',
	'Thursday': 'R',
	'Friday': 'F',
	'Saturday': 'S',
	'Monday, Wednesday': 'MW',
	'Tuesday, Thursday': 'TR',
	'Wednesday, Friday': 'WF',
	'Monday, Wednesday, Friday': 'MWF',
	'Monday, Tuesday, Wednesday': 'MTW',
	'Monday, Tuesday, Wednesday, Thursday, Friday': 'MTWRF',
	'Online': ' '
}

const drop = React.createRef()
const drop2 = React.createRef()
const drop3 = React.createRef()
const drop4 = React.createRef()

class Filters extends React.Component { 
	constructor(props) {
		super(props)
		this.state = {
			schedule: this.props.schedule,
			retrievedSchedule: this.props.retrievedSchedule,
			selectedDepartment: '',
			selectedProfessor: '',
			selectedDay: '',
			selectedTime: '',
			filterResults: [],
			classPool: this.props.classPool,
			departments: this.props.departments,
			professors: this.props.professors,
			meetingTimes: this.props.meetingTimes,
			className: this.props.className
		}
		this.filterCourses = this.filterCourses.bind(this)
	}

	filterCourses() {
		
		var k = []
		//all filters on
		if (this.state.selectedDepartment != '' && this.state.selectedProfessor != '' && this.state.selectedDay != '' && this.state.selectedTime != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].instructor == this.state.selectedProfessor && key[j].days == this.state.selectedDay && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//department, professor, day
		else if (this.state.selectedDepartment != '' && this.state.selectedProfessor != '' && this.state.selectedDay != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].instructor == this.state.selectedProfessor && key[j].days == this.state.selectedDay) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//department, professor, time
		else if (this.state.selectedDepartment != '' && this.state.selectedProfessor != '' && this.state.selectedTime != '') {
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].instructor == this.state.selectedProfessor && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//department, day, time
		else if (this.state.selectedDepartment != '' && this.state.selectedDay != '' && this.state.selectedTime != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].days == this.state.selectedDay && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//professor, day, time
		else if (this.state.selectedProfessor != '' && this.state.selectedDay != '' && this.state.selectedTime != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].instructor == this.state.selectedProfessor && key[j].days == this.state.selectedDay && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
						k.push(key[j]);
					}
				}
			}
		}
		//department, professor
		else if (this.state.selectedDepartment != '' && this.state.selectedProfessor != '') {
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].instructor == this.state.selectedProfessor) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//department, day
		else if (this.state.selectedDepartment != '' && this.state.selectedDay != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if (key[j].days == this.state.selectedDay) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//department, time
		else if (this.state.selectedDepartment != '' && this.state.selectedTime != '') {
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						if ((key[j].start + " - " + key[j].end) == this.state.selectedTime) {
							k.push(key[j]);
						}
					}
				}
			}
		}
		//professor, day
		else if (this.state.selectedProfessor != '' && this.state.selectedDay != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].instructor == this.state.selectedProfessor && key[j].days == this.state.selectedDay) {
						k.push(key[j]);
					}
				}
			}
		}
		//professor, time
		else if (this.state.selectedProfessor != '' && this.state.selectedTime != '') {
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].instructor == this.state.selectedProfessor && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
						k.push(key[j]);
					}
				}
			}
		}
		//day, time
		else if (this.state.selectedDay != '' && this.state.selectedTime != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].days == this.state.selectedDay && (key[j].start + " - " + key[j].end) == this.state.selectedTime) {
						k.push(key[j]);
					}
				}
			}
		}
		//department
		else if (this.state.selectedDepartment != '') {
			for (var key of Object.values(this.state.classPool)) {
				if (key[0].subject == this.state.selectedDepartment) {
					for (var j = 0; j < key.length; j++) {
						k.push(key[j]);
					}
				}
			}
		}
		//professor
		else if (this.state.selectedProfessor != '') {
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].instructor == this.state.selectedProfessor) {
						k.push(key[j]);
					}
				}
			}
		}
		//day
		else if (this.state.selectedDay != '') {
			if (this.state.selectedDay == " ") {
				this.state.selectedDay = ""
			}
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].days == this.state.selectedDay) {
						k.push(key[j]);
					}
				}
			}
		}
		//time
		else {
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if ((key[j].start + " - " + key[j].end) == this.state.selectedTime) {
						k.push(key[j]);
					}
				}
			}
		}

		k = k.sort()

		//text input stuff... if there are elements in k, filter from box
		if (this.state.className != null && k.length > 0) {
			k = k.filter(data => data.title.includes(this.state.className));
		}
		//if no elements in k, search for filterResults with said name
		else if (this.state.className != null) {
			console.log(this.state.className)
			for (var key of Object.values(this.state.classPool)) {
				for (var j = 0; j < key.length; j++) {
					if (key[j].title.includes(this.state.className)) {
						k.push(key[j]);
					}
				}
			}
		}

		for (var i=0; i<k.length; i++) {
			if (k[i].instructor.length < 1) {
				k[i].instructor = "Staff"
			}
		}

		this.props.loadClasses({filterResults: k})
		this.props.navigation.navigate("Search Results")
		drop.current.reset()
		drop2.current.reset()
		drop3.current.reset()
		drop4.current.reset()
		this.state.selectedDepartment = ''
		this.state.selectedProfessor = ''
		this.state.selectedDay = ''
		this.state.selectedTime = ''
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
							top: "12%",
							bottom: "5%",
							alignItems: "flex-start",
						}}>
						<Text style={styles.titleText}>What type of class?</Text>
						<View
							style={{
								flex: 0.05,
							}} />
						<SelectDropdown
							data={this.props.departments}
							defaultButtonText={"Department"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							ref={drop}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								this.setState((state, props) => ({ ...state, selectedDepartment: selectedItem }))
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
							data={this.props.professors}
							defaultButtonText={"Professor"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							ref={drop2}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								this.setState((state, props) => ({ ...state, selectedProfessor: selectedItem }))
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
							data={Object.keys(daymap)}
							defaultButtonText={"Meeting Days"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							ref={drop3}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								this.setState((state, props) => ({ ...state, selectedDay: daymap[selectedItem] }))
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
							data={this.props.meetingTimes}
							defaultButtonText={"Meeting Times"}
							dropdownStyle="arrow"
							buttonStyle={styles.dropdown1BtnStyle}
							ref={drop4}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#444"} size={18} />
								);
							}}
							onSelect={(selectedItem, index) => {
								this.setState((state, props) => ({ ...state, selectedTime: selectedItem }))
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
						<TextInput style={styles.input} placeholder="Type here... (case-sensitive)" onChangeText={(text) => {
							this.setState((state, props) => ({ ...state, className: text }))
						}} />

						<View
							style={{
								flex: 0.1,
							}} />
						<View style={{ backgroundColor: "black", left: "55%" }}>
							<Button
								type="clear"
								title="Search Classes"
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
	  selectedDepartment: state.selectedDepartment,
	  selectedProfessor: state.selectedProfessor,
	  selectedDay:  state.selectedDay,
	  selectedTime: state.selectedTime,
	  filterResults: state.filterResults,
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
		height: "100%",
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
