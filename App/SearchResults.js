import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"


export default class SearchResults extends React.Component {

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
			classes: this.props.classes,
			show: this.props.show,
			selectedDepartment: this.props.selectedDepartment,
		}
		this.flip = this.flip.bind(this)
		this.mapClasses = this.mapClasses.bind(this)
	}


	mapClasses() {
		var grab = this.state.classes
		//Sconsole.log("MapClasses selectedDepartment", this.state.classes)
		return (
			<ScrollView>
				{grab.map((item, key) => {
					return (
						<View key={item.subject + item.mnemonic + item.section + item.term}>
							<Text style={styles.className}>{item.title}</Text>
							<Text style={styles.details}>{item.instructor}</Text>
							<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
								<Button
									type="clear"
									title="Add"
									color="#FFFF"
									onPress={() => this.state.retrievedSchedule = item}
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


	render() {
		return (<View
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
					onPress={this.flip}
				/>
			</View>
			<View style={{ backgroundColor: "black", width: "30%", right: "10%", top: "88%", position: "absolute" }}>
				<Button
					type="clear"
					title="Confirm"
					color="#FFFF"
				onPress={() => this.props.updateUser(this.state)}
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
