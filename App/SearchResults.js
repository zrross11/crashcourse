import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { selectedDepartment } from './Filters'
import { classExtractor } from './CourseRoster';
import populateClass from '../ExtraCode'
import SemesterMapper from './Semester';


export default class SearchResults extends React.Component {

	constructor(props) {
		super(props)
		// console.log("SearchResults.js: Props params", this.props.route.params.classes)
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
		this.mapClasses = this.mapClasses.bind(this)
		this.goBack = this.goBack.bind(this)
		this.confirm = this.confirm.bind(this)
		this.addClass = this.addClass.bind(this)
	}


	mapClasses(){
		// console.log("SearchResults.js: mapClasses state of classes",this.props.route.params.classes)
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
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onPress={() => this.addClass(item)}
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

	goBack() {
		this.props.navigation.pop()
	}

	confirm() {
		this.props.navigation.pop()
		this.props.navigation.navigate(`${this.state.firstName}'s Schedule`)
	}

	async addClass(key){
		// Call the populate class method on the course
		var sched = this.state.retrievedSchedule // map holding each date in the semester and the array of clases on it 
		var {Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		populateClass(key, Semester, sched)
		this.setState((state, props) => ({
			...state, retrievedSchedule: sched
		}));

	}

	render() {
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
					<View>{this.mapClasses()}</View>
				</ScrollView>
			</View>
			<View style={{ backgroundColor: "black", width: "30%", left: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Go back"
					color="#FFFF"
					onPress={this.goBack}
				/>
			</View>
			<View style={{ backgroundColor: "black", width: "30%", right: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Confirm"
					color="#FFFF"
				onPress={this.confirm}
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
