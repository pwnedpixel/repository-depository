import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Image, ToastAndroid, FlatList, Text, RefreshControl} from 'react-native';
import ActionButton from 'react-native-action-button';
import colors from '../constants/Colors';
import * as Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };

      async _signInWithGoogleAsync() {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId: "354599152461-gou3imo008jjv08uss66bgdjudotoerj.apps.googleusercontent.com",
            scopes: ['profile'],
          });
  
          if (result.type === 'success') {
            this.props.navigation.navigate('Main');
          } else {
            return {cancelled: true};
          }
        } catch(e) {
          return {error: true};
        }
      }

      componentWillMount(){
          //;
      }

  render() {
    return (
      <View  style={styles.container}>
        <View style={styles.logo}>
            <Image style={{width: 250, height: 250}} source={require('../assets/images/deporepoWhite.png')} />
        </View>
        <View style={styles.button}>
            <Ionicons.Button name="logo-google" color={colors.tintColor} backgroundColor="white" onPress={() => {this._signInWithGoogleAsync()}}>
                Login with Google
            </Ionicons.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tintColor,
  },
  logo: {
    flex: 3,
    backgroundColor: colors.tintColor,
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  button: {
    flex: 2,
    backgroundColor: colors.tintColor,
    alignItems: "center",
    marginTop: 50
  }
});
