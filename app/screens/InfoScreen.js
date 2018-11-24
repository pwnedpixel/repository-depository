import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  Image
} from 'react-native';
import colors from '../constants/Colors';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Listing",
  };

  render() {
    let storage = this.props.navigation.getParam('storage', null);
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "https://img.artpal.com/77573/14-15-6-7-1-24-2m.jpg"}}>
        </Image>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.title}>{storage.title}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Cost</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{'$' + storage.price + '/month'}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Size</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{storage.size + ' m²'}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Owner</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{storage.owner}</Text></View>
          </View>
          <View style={{alignItems: 'center', paddingTop: 15}}>
            <View style={{width: 200}}><Button onPress={() => {}} title={"Rent Me"}/></View>
          </View>
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
    padding: 15,
    height: 230
  },
  image: {
    flex: 1,
  },
  leftCol: {
    flex: 1
  },
  rightCol: {
    flex: 1,
  },
  rightColText: {
    textAlign: 'right',
    fontSize: 18,
    color: colors.tintColor
  },
  leftColText: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
