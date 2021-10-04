import React, {FC, ReactElement, useCallback, useState, useEffect} from 'react';
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
import * as SecureStore from 'expo-secure-store';

// import Styles from './Styles';

export const UserLogInPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserAccount, setUser] = useState('');
  const [sendBack,setSendBack] = useState('')

  

  console.log("Login??",props)
  const doUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        // logIn returns the corresponding ParseUser object
        Alert.alert(
          'Success!',
          `User ${loggedInUser.get('username')} has successfully signed in!`,
        );
        // To verify that this is in fact the current user, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        console.log("Logged In User & Current User are good.",loggedInUser === currentUser);
        return true;
      })
      .catch((error) => {
        // Error can be caused by wrong parameters or lack of Internet connection
        Alert.alert('Error!', error.message);
        return false;
      });
      const currentUser = await Parse.User.currentAsync();
      var sendBack = {
          login: true,
          user: currentUser,
          schedule: currentUser.schedule,
      }
    // props.onChange(sendBack);
    // setSendBack(sendBack);
    let token = await SecureStore.setItemAsync('token', JSON.stringify(currentUser))
    console.log("Login has saved the token",token)
    return token;
  };

//   return class extends React.Component {
//   render(){
  return (
    <View  style={{margin: "0%", padding: "0%", marginTop: "-20%"}}>
      <View  style={{margin: "0%", padding: "0%", marginTop: "-5%"}}>
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
        <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, width: "30%"}} onPress={doUserLogIn}>
          <View  style={{borderColor: "white", }}>
          <Button
            onPress={doUserLogIn}
            title="Sign In"
            color="black"
            backgroundColor="white"            
            accessibilityLabel="Learn more about this purple button"
            />

            {/* <Text>{`Sign In`}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={}>
        <View style={}>
          <View style={} />
          <Text style={}>{'or'}</Text>
          <View style={} />
        </View>
        <View style={ s}>
          <TouchableOpacity>
            <View
              style={[
                ,
               
              ]}>
              <Image
                
                source={require('./assets/icon-facebook.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View >
              <Image
                
                source={require('./assets/icon-google.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View >
              <Image
                
                source={require('./assets/icon-apple.png')}
              />
            </View>
          </TouchableOpacity>
        </View> 
            </View> */}
    </View>
  );      
//   }
// }

  
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

export default UserLogInPage ;