//
//  SearchResults
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View, Button } from "react-native"


export default class SearchResults extends React.Component {

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
			style={styles.searchResultsView}>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: 0,
					right: -2,
					top: 0,
					bottom: -2,
				}}>
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
						source={require("./../assets/images/results.png")}
						style={styles.searchResultsBackgroundMaskImage} />
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						right: 63,
						top: 57,
						bottom: 48,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.csText}>CS</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.cs4720MobileAppDevelopmentText}>CS 4720: Mobile App Development</Text>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "stretch",
							height: 52,
							marginLeft: 11,
							flexDirection: "row",
							alignItems: "flex-end",
						}}>
						<Text
							style={styles.cancelText}>Cancel{"\n"}</Text>
						<View
							style={{
								flex: 1,
							}} />
						<Text
							style={styles.addText}>Add (1)</Text>
						<Button
							title="Cancel"
							onPress={() => this.props.navigation.navigate("Add Classes")}
						/>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						right: 45,
						top: 561,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFText}>Days: M, W, F</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamText}>Daniel Graham</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						width: 255,
						top: 522,
						height: 104,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.cs4720MobileAppDevelopmentTwoText}>CS 4720: Mobile App Development</Text>
					<Text
						style={styles.gpa36Text}>GPA: 3.6</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						right: 45,
						top: 477,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFTwoText}>Days: M, W, F</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamTwoText}>Daniel Graham</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 48,
						width: 255,
						top: 438,
						height: 104,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.cs4720MobileAppDevelopmentThreeText}>CS 4720: Mobile App Development</Text>
					<Text
						style={styles.gpa36TwoText}>GPA: 3.6</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 48,
						right: 46,
						top: 393,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFThreeText}>Days: M, W, F</Text>
					<Text
						style={styles.time200Pm250pmThreeText}>Time: 2:00 PM - 2:50PM</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamThreeText}>Daniel Graham</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 48,
						width: 255,
						top: 354,
						height: 104,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.cs4720MobileAppDevelopmentFourText}>CS 4720: Mobile App Development</Text>
					<Text
						style={styles.gpa36ThreeText}>GPA: 3.6</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 48,
						right: 46,
						top: 309,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFFourText}>Days: M, W, F</Text>
					<Text
						style={styles.time200Pm250pmFourText}>Time: 2:00 PM - 2:50PM</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamFourText}>Daniel Graham</Text>
				</View>
				<Text
					style={styles.gpa36FourText}>GPA: 3.6</Text>
				<Text
					style={styles.cs4720MobileAppDevelopmentFiveText}>CS 4720: Mobile App Development</Text>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						right: 45,
						top: 236,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFFiveText}>Days: M, W, F</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamFiveText}>Daniel Graham</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						width: 255,
						top: 197,
						height: 104,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.cs4720MobileAppDevelopmentSixText}>CS 4720: Mobile App Development</Text>
					<Text
						style={styles.gpa36FiveText}>GPA: 3.6</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 49,
						right: 45,
						top: 152,
						height: 52,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.daysMWFSixText}>Days: M, W, F</Text>
					<View
						style={{
							flex: 1,
						}} />
					<Text
						style={styles.danielGrahamSixText}>Daniel Graham</Text>
				</View>
				<Text
					style={styles.gpa36SixText}>GPA: 3.6</Text>
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					alignSelf: "center",
					width: 88,
					top: 152,
					height: 461,
					alignItems: "center",
				}}>
				<Text
					style={styles.time200Pm250pmSixText}>Time: 2:00 PM - 2:50PM</Text>
				<Text
					style={styles.time200Pm250pmFiveText}>Time: 2:00 PM - 2:50PM</Text>
				<Text
					style={styles.time200Pm250pmTwoText}>Time: 2:00 PM - 2:50PM</Text>
				<Text
					style={styles.time200Pm250pmText}>Time: 2:00 PM - 2:50PM</Text>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	searchResultsView: {
		backgroundColor: "white",
		flex: 1,
	},
	searchResultsBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 814,
	},
	csText: {
		color: "black",

		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		marginLeft: 37,
	},
	cs4720MobileAppDevelopmentText: {
		color: "rgb(53, 71, 233)",

		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
		marginBottom: 56,
	},
	cancelText: {
		color: "white",

		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
	},
	addText: {
		color: "white",

		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		marginBottom: 26,
	},
	daysMWFText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	cs4720MobileAppDevelopmentTwoText: {
		color: "rgb(53, 71, 233)",

		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
	},
	gpa36Text: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
	},
	daysMWFTwoText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamTwoText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	cs4720MobileAppDevelopmentThreeText: {
		color: "rgb(53, 71, 233)",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
	},
	gpa36TwoText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
		marginLeft: 1,
	},
	daysMWFThreeText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	time200Pm250pmThreeText: {
		backgroundColor: "transparent",
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 88,
		marginLeft: 43,
	},
	danielGrahamThreeText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	cs4720MobileAppDevelopmentFourText: {
		color: "rgb(53, 71, 233)",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
	},
	gpa36ThreeText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
	},
	daysMWFFourText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	time200Pm250pmFourText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 88,
		marginLeft: 43,
	},
	danielGrahamFourText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	gpa36FourText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		position: "absolute",
		left: 48,
		width: 31,
		top: 322,
	},
	cs4720MobileAppDevelopmentFiveText: {
		color: "rgb(53, 71, 233)",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		position: "absolute",
		left: 49,
		width: 255,
		top: 281,
	},
	daysMWFFiveText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamFiveText: {
		color: "black",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	cs4720MobileAppDevelopmentSixText: {
		color: "rgb(53, 71, 233)",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
	},
	gpa36FiveText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
	},
	daysMWFSixText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamSixText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	gpa36SixText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		position: "absolute",
		left: 49,
		width: 31,
		top: 165,
	},
	time200Pm250pmSixText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 88,
	},
	time200Pm250pmFiveText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 88,
		marginTop: 32,
	},
	time200Pm250pmTwoText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 88,
		marginTop: 189,
	},
	time200Pm250pmText: {
		color: "black",

		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 88,
		marginTop: 32,
	},
})
