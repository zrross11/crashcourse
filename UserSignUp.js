import React, {FC, ReactElement, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
  Button
} from 'react-native';
import Parse from 'parse/react-native';
// import Styles from './Styles';

export const UserSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const doUserSignUp = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    const emailValue = email;
    const schedule = {};

    var obj = new Parse.Object("Schedule");
    obj.set("Classes", schedule)
    var result = await obj.save();


    var user = new Parse.User();
    user.set("username", usernameValue);
    user.set("password", passwordValue);
    user.set("email", emailValue);
    user.set("schedule", result.id); // ObjectID of this user's current schedule
    

    return await user.signUp().then(function(user) {
        console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });


    // return await Parse.User.logIn(usernameValue, passwordValue)
    //   .then(async (loggedInUser) => {
    //     // logIn returns the corresponding ParseUser object
    //     Alert.alert(
    //       'Success!',
    //       `User ${loggedInUser.get('username')} has successfully signed in!`,
    //     );
    //     // To verify that this is in fact the current user, currentAsync can be used
    //     const currentUser = await Parse.User.currentAsync();
    //     console.log(loggedInUser === currentUser);
    //     return true;
    //   })
    //   .catch((error) => {
    //     // Error can be caused by wrong parameters or lack of Internet connection
    //     Alert.alert('Error!', error.message);
    //     return false;
    //   });
  };


  return (
    <View style={{margin: "0%", padding: "0%", marginTop: "-20%"}}>
      <View style={{margin: "0%", padding: "0%", marginTop: "-5%"}}>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={'Username'}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput          
          style={styles.input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput          
          style={styles.input}
          value={email}
          placeholder={'Email Address'}
          
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, width: "30%"}} onPress={() => doUserSignUp()}>
          <View style={{borderColor: "white", }}>
          <Button
            onPress={doUserSignUp}
            title="Sign Up"
            color="black"
            backgroundColor="white"            
            accessibilityLabel="Learn more about this purple button"
            />

          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    //   color: "white",
      backgroundColor: "white",
    },
  });

export default UserSignUp ;