import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import { depopulateClass } from '../ExtraCode';
import SemesterMapper from './../App/Semester';
import { connect } from 'react-redux'

const daymap = {
	'M': 'Monday',
	'T': 'Tuesday',
	'W': 'Wednesday',
	'R': 'Thursday',
	'F': 'Friday',
	'S': 'Saturday',
	'MW': 'Monday, Wednesday',
	'TR': 'Tuesday, Thursday',
	'WF': 'Wednesday, Friday',
	'MWF': 'Monday, Wednesday, Friday',
	'MTW': 'Monday, Tuesday, Wednesday',
	'MTWRF': 'Mon, Tues, Wed, Thurs, Fri',
	'': 'Online',
}

export class RemoveClasses extends React.Component {

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
		}
		this.removeAClass = this.removeAClass.bind(this)
	}

	async removeAClass(item) {
		// Call the populate class method on the course
		var sched = JSON.parse(JSON.stringify(this.props.retrievedSchedule)) // map holding each date in the semester and the array of clases on it 
		var { Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		var newSched = depopulateClass(item, Semester, sched)
		this.props.removeClasses({ retrievedSchedule: newSched })

		this.setState((state, props) => ({ ...state, retrievedSchedule: newSched }))
	}

	fixTime(time) {
		var tester = parseInt(time.substring(0,2))
		var half = " AM"
		if (tester >= 12) {
			half = " PM"
			if (tester > 12) {
				tester = tester - 12
			}
		}
		var output = tester + ":" + time.substring(3,5) + half
		return output
	}

	render() {
		var grab = this.props.retrievedSchedule;
		var classes = []
		var coursenumbers = []
		for (let i = 0; i < Object.values(grab).length; i++) {
			if (Object.values(grab)[i].length > 0)
				for (let j = 0; j < Object.values(grab)[i].length; j++) {
					if (!coursenumbers.includes(Object.values(grab)[i][j].number)) {
						classes.push(Object.values(grab)[i][j])
						coursenumbers.push(Object.values(grab)[i][j].number)
					}
				}
		}
		console.log(classes)
		if (classes.length < 1) {
			return (<View
				style={styles.DropView}>
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
						style={styles.DropBackgroundMaskImage} />
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: "10%",
						width: "80%",
						top: "12%",
						bottom: "15%",
						alignItems: "flex-start",
					}}>
					<View
						style={{
							flex: 0.1,
						}} />
					<Text style={styles.titleText}> No Classes Added</Text>
				</View>

			</View>
			)
		}
		return (<View
			style={styles.DropView}>
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
					style={styles.DropBackgroundMaskImage} />
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: "10%",
					width: "80%",
					top: "12%",
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
							{classes.map((item, key) => {
								var theClass = item;
								return (
									<View key={key}>
										<Text style={styles.className}>{item.title}</Text>
										<Text style={styles.details}>{item.instructor}</Text>
										<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
											<Button
												title="Drop"
												color="#FFFF"
												onPress={() => { console.log("RemoveScreen.js: About to delete", theClass); this.removeAClass(theClass) }}
											/>
										</View>
										<Text style={styles.details}>{daymap[item.days]}</Text>
										<Text style={styles.details}>{this.fixTime(item.start) +  " - " +this.fixTime(item.end)}</Text>
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
		LOGIN: (item) => dispatch({ type: 'LOGIN', payload: item }),
		decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
		loadClasses: (item) => dispatch({ type: 'LOAD_CLASSES', payload: item }),
		addClasses: (item) => dispatch({ type: 'ADD_CLASSES', payload: item }),
		removeClasses: (item) => dispatch({ type: 'REMOVE_CLASSES', payload: item }),
		toggleShow: (item) => dispatch({ type: 'TOGGLE_SHOW', payload: item })
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RemoveClasses);


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: '100%',
	},
	DropView: {
		backgroundColor: "white",
		flex: 1,
	},
	DropBackgroundMaskImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: '100%',
	},
	className: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: "2%"
	},
	details: {
		fontSize: 13,
		marginLeft: "2%"
	},
	titleText: {
		fontSize: 34,
		fontWeight: "bold",
	},
})
