import React from "react"
import { Image, StyleSheet, Text, View, Button, ScrollView, SafeAreaView, SectionList } from "react-native"


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


	RemoveClasses() {
		var grab = this.state.retrievedSchedule;
		var classes = []
		for (let i = 0; i < 7; i++) {
			if (Object.values(grab)[i].length > 0)
				for (let j = 0; j < Object.values(grab)[i].length; j++) {
					if (!classes.includes(Object.values(grab)[i][j])) {
						classes.push(Object.values(grab)[i][j])
					}
				}
		}
		console.log(classes)
		return (
			<ScrollView>
				{classes.map((item, key) => {
					return (
					<View key={key}>
						<Text style={styles.className}>{item.title}</Text>
						<Text style={styles.details}>{item.instructor}</Text>
						<View style={{ backgroundColor: "black", width: "20%", left: "75%", top: "25%", position: "absolute" }}>
							<Button
								type="clear"
								title="Drop"
								color="#FFFF"
								onPress={() => console.log("tester")}
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
