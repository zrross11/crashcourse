//
//  MainScreenTwo
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View, Button } from "react-native"
import RemoveClasses from "./RemoveClasses/";


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
					source={require("./../assets/images/filters.png")}
					style={styles.mainScreenBackgroundMaskImage} />
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: 15,
					width: 314,
					top: 37,
					bottom: 152,
					alignItems: "flex-start",
				}}>
				<Text
					style={styles.whatTypeOfClassText}>What type of Class?</Text>
				<Text
					style={styles.departmentText}>Department</Text>
				<Text
					style={styles.professorText}>Professor</Text>
				<Text
					style={styles.meetingDaysText}>Meeting Days</Text>
				<Text
					style={styles.locationText}>Location</Text>
				<View
					style={{
						flex: 1,
					}} />
				<Text
					style={styles.searchByClassNameText}>SEARCH BY CLASS NAME:</Text>
				<Button
					title="Show classes"
					onPress={() => this.props.navigation.navigate(RemoveClasses)}
				/>
			</View>
		</View>
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
	whatTypeOfClassText: {
		color: "black",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 304,
	},
	departmentText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 31,
		marginTop: 1,
	},
	professorText: {
		color: "white",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 31,
		marginTop: 44,
	},
	meetingDaysText: {
		color: "white",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 31,
		marginTop: 44,
	},
	locationText: {
		backgroundColor: "transparent",
		color: "white",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 31,
		marginTop: 43,
	},
	searchByClassNameText: {
		color: "white",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 284,
	},
})
