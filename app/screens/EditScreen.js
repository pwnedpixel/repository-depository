import React from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  ToastAndroid,
  KeyboardAvoidingView,
  Text,
  Image
} from 'react-native';
import colors from '../constants/Colors';
import { ImagePicker, MapView } from 'expo';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Listing",
  };

  constructor(props){
    super(props);
    let storage = this.props.navigation.getParam('storage', {price: 0, size: 0});
    this.state = { new: this.props.navigation.getParam('new', false), lat: storage.lat, long: storage.long, storage: storage, title: storage.title, price: storage.price.toString(), size: storage.size.toString(), photo: storage.photo ? storage.photo : "https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png" };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };

  _update() {
    let payload = {price: parseInt(this.state.price), size: parseInt(this.state.size), title: this.state.title.toString(), lat: this.state.lat, long: this.state.long};
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/editstorage?objectID="+this.state.storage.objectID+"&payload="+JSON.stringify(payload));
    ToastAndroid.show('Listing Updated!', ToastAndroid.SHORT);
    const data = new FormData();
    data.append('file', {
      uri: this.state.photo,
      type: 'image/png',
      name: new Date().getTime().toString()
    });
    fetch("https://local-index-222414.appspot.com/upload?usage=storage&objectID=" + this.state.storage.objectID, {
      method: 'post',
      body: data
    })
  }

  _create() {
    let that = this;
    console.log(this.state.photo);
    const data = new FormData();
    data.append('file', {
      uri: this.state.photo,
      type: 'image/png',
      name: new Date().getTime().toString()
    });
    fetch("https://local-index-222414.appspot.com/upload?usage=other&objectID=0", {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      body: data
    }).then(function(response) {
      return response.json()
    }).then(function(imgUrl) {
      console.log(imgUrl);
      that._createStorage(imgUrl.url);
    })
  }

  _createStorage(imgUrl) {
    let storageId = new Date().getTime();
    let payload = {
      price: parseInt(this.state.price), 
      size: parseInt(this.state.size), 
      title: this.state.title.toString(),
      storageId: storageId,
      events: [],
      owner: this.props.screenProps.name,
      lat: this.state.lat,
      long: this.state.long,
      ownerId: this.props.screenProps.userId,
      renter: "",
      renterId: "",
      photo: imgUrl,
    };
    console.log("https://pwnedpixel.lib.id/repository-depository@dev/createstorage?storageId=''&payload="+JSON.stringify(payload));
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/createstorage?storageId=''&payload="+JSON.stringify(payload));
    this._updateUser(storageId);
  }

  _updateUser(storageId) {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getuser/?userId=' + this.props.screenProps.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let offering = myJson.offering;
        offering.push(storageId);
        console.log(offering);
        that._updateUserListings(offering);
      });
  }

  _updateUserListings(offering){
    let payload = {offering: offering};
    console.log(payload);
    fetch("https://pwnedpixel.lib.id/repository-depository@dev/edituser?objectID="+this.props.screenProps.objectId+"&payload="+JSON.stringify(payload));
    ToastAndroid.show('Listing Created!', ToastAndroid.SHORT);
    this.setState({new : false});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity style={styles.image} onPress={() => {this._pickImage()}}><Image style={styles.image} source={{uri: this.state.photo}}/></TouchableOpacity>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={styles.leftCol}><TextInput style={styles.title} onChangeText={(title) => { this.setState({title: title}) }} value={this.state.title}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Cost</Text></View>
            <View style={styles.rightCol}><TextInput keyboardType = 'numeric' style={styles.rightColText} onChangeText={(price) => { this.setState({price: price}) }} value={this.state.price.toString()}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Size</Text></View>
            <View style={styles.rightCol}><TextInput keyboardType = 'numeric' style={styles.rightColText} onChangeText={(size) => { this.setState({size: size}) }} value={this.state.size.toString()}/></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Owner</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{this.state.storage.owner}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.leftColText}>Renter</Text></View>
            <View style={styles.rightCol}><Text style={styles.rightColText}>{this.state.storage.renter}</Text></View>
          </View>
      
            <MapView
              style={styles.map}
              showsUserLocation={true}
              draggab
              initialRegion={{
                latitude: 43.0045047,
                longitude: -81.2762352,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Marker draggable
                coordinate={{
                  latitude: this.state.lat,
                  longitude: this.state.long
                }}
                pinColor={colors.tintColor}
                onDragEnd={(e) => this.setState({lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude})}
              />
            </MapView>
        
          <View style={{alignItems: 'center', paddingTop: 15}}>
            <View style={{width: 200}}><Button onPress={() => {this.state.new ? this._create() : this._update()}} title={"Save Changes"}/></View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    height: 500
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
  },
  map: {
    flex: 1
  }
});
