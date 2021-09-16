//
//  RemoveClasses
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"


export default class RemoveClasses extends React.Component {

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
				style={styles.removeClassesView}>
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
							source={require("./../assets/images/remove-classes-background-mask.png")}
							style={styles.removeClassesBackgroundMaskImage}/>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 15,
							right: 50,
							top: 37,
							bottom: 48,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.bennettSClassesText}>Bennett’s Schedule</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.cs4720MobileAppDevelopmentText}>CS 4720: Mobile App Development</Text>
						<View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								height: 52,
								marginLeft: 45,
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
								style={styles.cancelText}>Cancel{"\n"}</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.addText}>Remove (1)</Text>
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
							}}/>
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
							}}/>
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
							}}/>
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
							}}/>
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
							}}/>
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
							}}/>
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
	removeClassesView: {
		backgroundColor: "white",
		flex: 1,
	},
	removeClassesBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 814,
	},
	bennettSClassesText: {
		color: "black",
		fontSize: 40,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 304,
	},
	cs4720MobileAppDevelopmentText: {
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 255,
		marginLeft: 34,
		marginBottom: 56,
	},
	cancelText: {
		color: "white",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		backgroundColor: "transparent",
	},
	addText: {
		backgroundColor: "transparent",
		color: "white",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		width: 90,
	},
	daysMWFText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 56,
	},
	cs4720MobileAppDevelopmentTwoText: {
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamTwoText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 56,
	},
	cs4720MobileAppDevelopmentThreeText: {
		backgroundColor: "transparent",
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		width: 255,
	},
	gpa36TwoText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
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
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 50,
	},
	time200Pm250pmThreeText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	cs4720MobileAppDevelopmentFourText: {
		backgroundColor: "transparent",
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		width: 255,
	},
	gpa36ThreeText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
	},
	daysMWFFourText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 50,
	},
	time200Pm250pmFourText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 56,
	},
	gpa36FourText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		position: "absolute",
		left: 48,
		width: 31,
		top: 322,
	},
	cs4720MobileAppDevelopmentFiveText: {
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 50,
	},
	danielGrahamFiveText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 56,
	},
	cs4720MobileAppDevelopmentSixText: {
		backgroundColor: "transparent",
		color: "rgb(53, 71, 233)",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 20,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 26,
		width: 255,
	},
	gpa36FiveText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		backgroundColor: "transparent",
		width: 31,
	},
	daysMWFSixText: {
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 50,
	},
	danielGrahamSixText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
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
		//fontFamily: ".AppleSystemUIFont",
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
		backgroundColor: "transparent",
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 26,
		width: 88,
		marginTop: 189,
	},
	time200Pm250pmText: {
		color: "black",
		//fontFamily: ".AppleSystemUIFont",
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
