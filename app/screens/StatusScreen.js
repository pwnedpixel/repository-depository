import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ToastAndroid
} from 'react-native';
import colors from '../constants/Colors';
import dimens from '../constants/Layout';

export default class StatusScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Storage Title",
  };

  constructor(props){
    super(props);
    this.state = { storage: this.props.navigation.getParam('storage', null) };
  }

  getDate(ms) {
    d = new Date(ms)
    return d.toString().split(" ").splice(0,5).join(" ")
  }

  _unrent() {
    let that = this;
    let payload = {renter: "", renterId: ""};
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/editstorage?objectID="+this.state.storage.objectID+"&payload="+JSON.stringify(payload));
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getuser/?userId=' + this.props.screenProps.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let renting = myJson.renting;
        let index = renting.indexOf(that.state.storage.storageId)
        renting.pop(index);
        that._updateUserRentals(renting);
      });
  }

  _updateUserRentals(renting){
    let payload = {renting: renting};
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/edituser?objectID="+this.props.screenProps.objectId+"&payload="+JSON.stringify(payload));
    ToastAndroid.show('Request success!', ToastAndroid.SHORT);
  }

  render() {
    let storage = this.props.navigation.getParam('storage', {price: 0, size: 0});
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: storage.photo ? storage.photo: "https://img.artpal.com/77573/14-15-6-7-1-24-2m.jpg"}}>
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
        </View>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.title}>Events</Text></View>
          </View>
          <FlatList
            data={storage.events.reverse()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity style={styles.flatview} onPress={() => {this.props.navigation.navigate('Event',{event: item})}}>
                <View style={styles.row}>
                  <View style={styles.leftCol}><Text style={styles.name}>{item.action}</Text></View>
                  <View style={styles.rightCol}><Text style={styles.price}>{this.getDate(item.time)}</Text></View>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.time.toString()}
          />
          <View style={{alignItems: 'center', paddingTop: 15}}>
            <View style={{width: 200}}><Button onPress={() => {this._unrent()}} title={"unRent Me"}/></View>
          </View>
        </View>
      </ScrollView>
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
  },
  image: {
    width: dimens.window.width,
    height: dimens.window.height / 3,
  },
  leftCol: {
    flex: 1
  },
  rightCol: {
    flex: 3,
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
  },
  name: {
    fontSize: 20
  },
  price: {
    fontSize: 20,
    textAlign: 'right',
    color: colors.tintColor
  }
});
