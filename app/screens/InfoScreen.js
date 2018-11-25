import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  ToastAndroid,
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

  constructor(props){
    super(props);
    this.state = { storage: this.props.navigation.getParam('storage', null) };
  }

  _rent() {
    let that = this;
    //fetch("https://pwnedpixel.lib.id/repository-depository@dev/editstorage?objectID="+this.state.storage.objectID+"&renter="+this.props.screenProps.name+"&renterId="+this.props.screenProps.userId);
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getuser/?userId=' + this.props.screenProps.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let renting = myJson.renting;
        renting.push(that.state.storage.storageId);
        that._updateUserRentals(renting);
      });
  }

  _updateUserRentals(renting){
    let payload = {renting: renting};
    console.log("https://pwnedpixel.lib.id/repository-depository@dev/edituser?objectID="+this.props.screenProps.objectId+"&payload="+JSON.stringify(payload));
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/edituser?objectID="+this.props.screenProps.objectId+"&payload="+JSON.stringify(payload));
    ToastAndroid.show('Request success!', ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.storage.photo}}>
        </Image>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.title}>{this.state.storage.title}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Cost</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{'$' + this.state.storage.price + '/month'}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Size</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{this.state.storage.size + ' m²'}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Owner</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{this.state.storage.owner}</Text></View>
          </View>
          <View style={{alignItems: 'center', paddingTop: 15}}>
            <View style={{width: 200}}><Button onPress={() => {this._rent()}} title={"Rent Me"}/></View>
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
