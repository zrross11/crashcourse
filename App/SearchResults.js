import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import populateClass from '../ExtraCode'
import SemesterMapper from './Semester';
import { connect } from 'react-redux';

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

class SearchResults extends React.Component {

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
			filterResults: this.props.filterResults,
			classPool: this.props.classPool,
			selectedDepartment: this.props.selectedDepartment,
		}
		this.goBack = this.goBack.bind(this)
		// this.confirm = this.confirm.bind(this)
		this.addClass = this.addClass.bind(this)
	}

	goBack() {
		this.props.navigation.pop()
	}

	// Was used to return back to the Filters page, corresponding button is commented out of render -- may be reimplemented.
	// confirm() {
	// 	this.props.navigation.pop()
	// 	this.props.navigation.navigate(`${this.state.firstName}'s Schedule`)
	// }

	async addClass(key){
		var sched = this.state.retrievedSchedule
		var {Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7));
		var newSched = populateClass(key, Semester, sched)
		this.props.navigation.pop()
		this.props.addClasses({retrievedSchedule: newSched})
		this.props.navigation.navigate(`${this.state.firstName}'s Schedule`)
	}


	render() {
		var grab = this.state.filterResults
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
				{grab.map((item, key) => {
					var theClass = item
					return (
						<View key={key}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }} >
								<Button
									title="Add"
									color="#FFFF"
									onPress={() => this.addClass(theClass)}
								/>
							</View>
							<Text style={styles.details}>{daymap[item.days]}</Text>
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
			{/* <View style={{ backgroundColor: "black", width: "30%", right: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Confirm"
					color="#FFFF"
				onPress={this.confirm}
				/></View> */}

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
	  selectedDepartment: state.selectedDepartment,
	  filterResults: state.filterResults,
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
	searchResultsView: {
		backgroundColor: "white",
		flex: 1,
	},
	searchResultsBackgroundMaskImage: {
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
	}
})
