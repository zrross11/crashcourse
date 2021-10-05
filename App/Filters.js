import React from "react";
import { Image, StyleSheet, Text, View, Button, TextInput } from "react-native"
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
	}
	departments.sort()
}
getFilters()

export default class MainScreenTwo extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			header: null,
			headerLeft: null,
			headerRight: null,
		}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	render() {
		return <View
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
						selectedDepartment = selectedItem 
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
					data={departments}
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
						onPress={() => this.props.navigation.navigate("Available")}
					/>
				</View>
			</View>
		</View>
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
})
