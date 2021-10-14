import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
// import { courses } from './../App'
import { selectedDepartment } from './Filters'
import { classExtractor } from './CourseRoster';
import populateClass from '../ExtraCode'
import SemesterMapper from './Semester';


var classes = []


export default class SearchResults extends React.Component {

	constructor(props) {
		super(props)
		// console.log("SearchResults.js: Props params", this.props)
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
			classes: this.props.route.params.classes,
			classPool: this.props.route.params.classPool,
			show: this.props.route.params.show,
			selectedDepartment: this.props.route.params.selectedDepartment,
		}
		// console.log("Clases searchresults received.", this.state.classes)
		// console.log("Clases search department received.", this.state.selectedDepartment)
		this.flip = this.flip.bind(this)
		this.mapClasses = this.mapClasses.bind(this)
		this.addClass = this.addClass.bind(this)
	}

	addClass(item){
		console.log("SearchResults.js: Add class was called. Should call parent one", this.props.route.params.addClass)
		// console.log("SearchResults.js: Add class was called. Should call parent two", this.props.route.options)
		// console.log("SearchResults.js: Add class was called. Should call parent 3", this.props.options)

		this.props.route.params.addClass(...item)
	}

	mapClasses(){
		// console.log("SearchResults.js: mapClasses state of classes",this.props.route.params.classes)
		// console.log("SearchResults: mapClasses props",this.props)
		// console.log("mapClasses sate of classPool",this.state.classPool)
		var grab = this.state.classes
		// console.log("The map", this.props)
		// var grab = this.state.classPool
		// console.log("SearchResults.js: MapClasses selectedDepartment", grab)
		return (
			<ScrollView>
				{grab.map((item, key) => {
					// console.log("Mapping", item)
					return (
						<View key={key}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }} >
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onClick={function(){this.addClass({...item})}}
									// onPress={this.props.addClasses(item)}
								/>
							</View>
							<Text style={styles.details}>{item.days}</Text>
							<Text style={styles.details}>{item.start +  " - " +item.end}</Text>
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
				})}
			</ScrollView>
		)
	}


	flip() {
		this.props.flipScreen();
	}



    async getResults() {
		var courses = await classExtractor();

		var k = this.state.classes
		for (var key of Object.values(courses)) {
			if (key[0].subject == this.state.selectedDepartment) {
				for (var j = 0; j < key.length; j++) {
					k.push([key[j].title, key[j].instructor, key[j].start, key[j].days, (key[j].subject + key[j].mnemonic), j]);
				}
			}
		}
		k.sort()
		this.setState({classes: k})
		this.props.updateUser(this.state)
	}

	render() {
		// this.getResults;
		// console.log(this.props.route.params.name)
		// console.log(this.props.route.params.departments)
		// console.log("search results params",this.props.route.params.addClasses)
		var grab = this.state.classes
		return (
		<View
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
					<View>
					<ScrollView>
				{grab.map((item, key) => {
					// console.log("Mapping", item)
					return (
						<View key={key}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }} >
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onPress={this.addClass(item)}
									// onPress={this.props.addClasses(item)}
								/>
							</View>
							<Text style={styles.details}>{item.days}</Text>
							<Text style={styles.details}>{item.start +  " - " +item.end}</Text>
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
				})}
			</ScrollView>
					</View>
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
				onPress={() => this.props.navigation.navigate("Drop Class")}
				/></View>

		</View>
		)
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
		fontWeight: "bold",
		marginLeft: "2%"
	},
	details: {
		fontSize: 13,
		marginLeft: "2%"
	}
})
