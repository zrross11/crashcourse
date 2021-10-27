import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { selectedDepartment } from './Filters'
import { classExtractor } from './CourseRoster';
import populateClass from '../ExtraCode'
import SemesterMapper from './Semester';
import { connect } from 'react-redux';


class SearchResults extends React.Component {

	constructor(props) {
		super(props)
		// console.log("SearchResults.js: Props params", this.props)
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
			classes: this.props.classes,
			classPool: this.props.classPool,
			show: 1,
			selectedDepartment: this.props.selectedDepartment,
		}
		// console.log("Clases searchresults received.", this.state.classes)
		// console.log("Clases search department received.", this.state.selectedDepartment)
		this.mapClasses = this.mapClasses.bind(this)
		this.goBack = this.goBack.bind(this)
		this.confirm = this.confirm.bind(this)
		this.addClass = this.addClass.bind(this)
		// console.log("SearchResults.js: Props",this.props)
	}

	addClass(item){
		console.log("SearchResults.js: Add class was called. Should call parent one", item)
		// console.log("SearchResults.js: Add class was called. Should call parent two", this.props.route.options)
		// console.log("SearchResults.js: Add class was called. Should call parent 3", this.props.options)

		this.props.addClass(...item)
	}

	mapClasses(){
		// console.log("SearchResults.js: mapClasses state of classes",this.props.classes)
		var grab = this.state.classes
		// console.log("The map", this.props)
		// var grab = this.state.classPool
		// console.log("SearchResults.js: MapClasses selectedDepartment", grab)
		return (
			<ScrollView>
				{grab.map((item, key) => {
					return (
						<View key={key}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }} >
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onPress={(item) => this.addClass(item)}
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
		// this.props.navigation.pop()
		this.props.navigation.navigate(`${this.state.firstName}'s Schedule`)
	}

	async addClass(key){
		// Call the populate class method on the course

		var sched = this.state.retrievedSchedule // map holding each date in the semester and the array of clases on it 
		var {Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		populateClass(key, Semester, sched)
		// this.setState((state, props) => ({
		// 	...state, retrievedSchedule: sched
		// }));
		// console.log("SearchResults.js: class update", sched)
		this.props.addClasses({retrievedSchedule: sched})
		this.props.toggleShow(!this.props.show)
		// this.props.navigation.navigate("Filter Page")
	}


	render() {
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
					var theClass = item
					return (
						<View key={key}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }} >
								<Button
									// type="clear"
									title="Add"
									color="#FFFF"
									onPress={() => this.addClass(theClass)}
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
	  show: state.show,
	  selectedDepartment: state.selectedDepartment,
	  classes: state.classes,
	  classPool: state.classPool,
	  departments: state.departments,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item}),
      decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
      loadClasses: (item) => dispatch({type: 'LOAD_CLASSES', payload: item}),
      addClasses: (item) => dispatch({type: 'ADD_CLASSES', payload: item}),
	  toggleShow: (item) => dispatch({type: 'TOGGLE_SHOW', payload: item})
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResults);

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
