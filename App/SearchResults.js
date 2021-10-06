//
//  SearchResults
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
<<<<<<< HEAD
import {StyleSheet, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Button, ImageBackground, Dimensions, Row, Col, SafeAreaView} from 'react-native';

=======
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { courses } from './../App'
import { selectedDepartment } from './Filters'

var classes = []
function getResults() {
	classes = []
	for (var key of Object.values(courses)) {
		if (key[0].subject == selectedDepartment) {
			for (var j = 0; j < key.length; j++) {
				classes.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
			}
		}
	}
	classes.sort()
}
>>>>>>> da2879df394fbcfd4a428b679c0c77dca1d5857e

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
		this.state = {
            username: this.props.username,
            password: this.props.password,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            loggedIn: this.props.loggedIn,
            schedule: this.props.schedule,
            retrievedSchedule: this.props.retrievedSchedule,
            courses: this.props.courses
        }
	}

	componentDidMount() {


	}

<<<<<<< HEAD
	render(){
		return (
			<ImageBackground source={require('../assets/images/background.jpg')} resizeMode='cover' style={styles.backgroundImage}> 
			<ScrollView>
				<SafeAreaView >
					<View style={styles.searchResultsBackgroundMaskImage}>
					{/* <View
				pointerEvents="box-none"
				style={{
					// position: "absolute",
					// left: 0,
					// right: -2,
					// top: 0,
					// bottom: -2,
				}}> */}
					<Text>Hi!</Text>
					{/* </View> */}
					</View>
				</SafeAreaView>
			</ScrollView>
			</ImageBackground>
		)
	}

	render2() {
		console.log("SearchResults displayed")
=======
	render() {
		getResults();
>>>>>>> da2879df394fbcfd4a428b679c0c77dca1d5857e
		return <View
			style={styles.searchResultsView}>
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
<<<<<<< HEAD
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
				{/* <View
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
				</View> */}
				<Text
					style={styles.gpa36SixText}>GPA: 3.6</Text>
=======
				<Image
					source={require("./../assets/images/background.jpg")}
					style={styles.searchResultsBackgroundMaskImage} />
>>>>>>> da2879df394fbcfd4a428b679c0c77dca1d5857e
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: "10%",
					width: "80%",
					top: "5%",
					bottom: "15%",
					alignItems: "flex-start",
				}}>
				<ScrollView
					style={{
						backgroundColor: "white",
						width: "100%",
						borderRadius: 6,
					}}>
					{classes.map((item, key) => (
						<View>
							<Text style={styles.className}>{item[0]}</Text>
							<Text style={styles.details}>{item[1]}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onPress={() => console.log("test")}
								/>
							</View>
							<Text style={styles.details}>{item[2]}</Text>
							<Text style={styles.details}>{item[3]}</Text>
							<View
								style={{
									borderBottomColor: 'black',
									borderBottomWidth: 2,
									width: "90%",
									left: "5%",
								}}
							/>
						</View>
					)
					)}
				</ScrollView>
			</View>
			<View style={{ backgroundColor: "black", width: "30%", left: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Go back"
					color="#FFFF"
					onPress={() => this.props.navigation.navigate("Add Classes")}
				/>
			</View>

			<View style={{ backgroundColor: "black", width: "30%", right: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Confirm"
					color="#FFFF"
					onPress={() => this.props.navigation.navigate("Zach's Schedule")}
				/></View>

		</View>
	}
}


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
	  },
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
	className: {
		fontSize: 15,
		fontWeight: "bold"
	},
	details: {
		fontSize: 13,
	}
})
