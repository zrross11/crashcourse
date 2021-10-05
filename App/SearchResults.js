//
//  SearchResults
//  CrashCoursesep13
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView } from "react-native"
import { courses } from './../App'
import { selectedDepartment } from './Filters'

var classes = []
function getResults() {
	classes = []
	for (var key of Object.values(courses)) {
		if (key[0].subject == selectedDepartment) {
			classes.push(key[0].title);
		}
	}
	classes.sort()
}

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
		getResults();
		console.log(classes)
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
					bottom: "5%",
					alignItems: "flex-start",
				}}>
				<ScrollView>
					{classes.map((item) => (
						<Text>{item}</Text>)
					)}
				</ScrollView>
				<Button
					type="clear"
					title="Go back"
					color="#FFFF"
					onPress={() => this.props.navigation.navigate("Add Classes")}
				/>

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
})
