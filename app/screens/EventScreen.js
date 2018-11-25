import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import colors from '../constants/Colors';

export default class EventScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Event Image",
  };

  render() {
    let event = this.props.navigation.getParam('event', null)
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: event.image}}>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
  },
});
