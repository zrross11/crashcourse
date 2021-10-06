//
//  SearchResults
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { selectedDepartment } from './Filters'
import { classExtractor } from './../App/CourseRoster';

// var classes2 = []
// async function getResults() {
// 	classes2 = []
// 	console.log(selectedDepartment)
// 	var courses = await classExtractor();
// 	for (var key of Object.values(courses)) {
// 		if (key[0].subject == selectedDepartment) {
// 			for (var j = 0; j < key.length; j++) {
// 				classes2.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
// 			}
// 		}
// 	}
// 	return classes2.sort()
// }

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
            courses: this.props.courses,
			show: this.props.show,
			classes: []
        }
		this.flip = this.flip.bind(this)
		this.getResults = this.getResults.bind(this)
	}

	componentDidMount() {


	}

	async getResults() {
		var classes2 = []
		console.log(selectedDepartment)
		var courses = await classExtractor();
		for (var key of Object.values(courses)) {
			if (key[0].subject == selectedDepartment) {
				for (var j = 0; j < key.length; j++) {
					classes2.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
				}
			}
		}
		this.setState({classes: classes2.sort()})
		console.log("checking for classes",this.state.classes)
		return classes2.sort()
	}

	flip(){
		this.setState({show: !this.state.show})
		this.props.updateUser(this.state)
	}

	render() {
		this.getResults;
		// console.log(classes)
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
				<Image
					source={require("./../assets/images/background.jpg")}
					style={styles.searchResultsBackgroundMaskImage} />
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
					{this.state.classes.map((item, key) => (
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
					onPress={this.flip}
				/>
			</View>

			<View style={{ backgroundColor: "black", width: "30%", right: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Confirm"
					color="#FFFF"
					// onPress={() => this.props.navigation.navigate("Zach's Schedule")}
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
