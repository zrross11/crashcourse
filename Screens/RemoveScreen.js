import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"
import depopulateClass from '../ExtraCode'


export default class RemoveClasses extends React.Component {

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
		this.RemoveClasses = this.RemoveClasses.bind(this)
	}


	async removeClasses(item){
        console.log("RemoveScreen.js: removeClasses was hit and called", item)
		// Call the populate class method on the course
		var sched = {} // map holding each date in the semester and the array of clases on it 
		console.log("Sched", sched)
		var {Semester, SemesterDays } = await SemesterMapper(new Date(2021, 7, 24), new Date(2021, 12, 7)); // object holding all the dates in the semester 
		// console.log("Semester",Semester)
		var newSched = depopulateClass(item, Semester, sched)
		this.setState((state, props) => ({
			...state, retrievedSchedule: newSched
		 }));
		// this.props.updateUser(this.state)
    }

	RemoveClasses() {
		return (
			<ScrollView>
				<View>
					<Text style={styles.className}>Placeholder text</Text>
					<Text style={styles.details}>Placeholder text</Text>
					<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
						<Button
							type="clear"
							title="Drop"
							color="#FFFF"
							onPress={() => console.log("test")}
						/>
					</View>
					<Text style={styles.details}>Placeholder text</Text>
					<Text style={styles.details}>Placeholder text</Text>
					<View
						style={{
							borderBottomColor: 'black',
							borderBottomWidth: 2,
							width: "90%",
							left: "5%",
						}}
					/>
				</View>
			</ScrollView>
		)
	}


	flip() {
		this.props.flipScreen();
	}


	render() {
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
					<View>{this.RemoveClasses()}</View>
				</ScrollView>
			</View>
			{/* <View style={{ backgroundColor: "black", width: "30%", left: "10%", top: "88%", position: "absolute" }}>
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
				/></View> */}

		</View>
		)
	}
}


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
