import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import colors from '../constants/Colors';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Storage Title",
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "https://img.artpal.com/77573/14-15-6-7-1-24-2m.jpg"}}>
        </Image>
        <View style={styles.information}>
          <Text>Cost</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  information: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
