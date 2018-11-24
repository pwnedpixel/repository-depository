import React from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Text,
  Image
} from 'react-native';
import colors from '../constants/Colors';
import { ImagePicker } from 'expo';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Listing",
  };

  constructor(props){
    super(props);
    let storage = this.props.navigation.getParam('storage', {price: 0, size: 0});
    this.state = { storage: storage, price: storage.price.toString(), size: storage.size.toString(), photo: storage.photo ? storage.photo : "https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png" };
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

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity style={styles.image} onPress={() => {this._pickImage()}}><Image style={styles.image} source={{uri: this.state.photo}}/></TouchableOpacity>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={styles.leftCol}><Text style={styles.title}>{this.state.storage.title}</Text></View>
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
          <View style={{alignItems: 'center', paddingTop: 15}}>
            <View style={{width: 200}}><Button onPress={() => {}} title={"Save Changes"}/></View>
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
    height: 270
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
