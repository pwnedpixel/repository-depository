import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider,
  Image
} from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import colors from '../constants/Colors';
import dimens from '../constants/Layout';

export default class FindScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { sliderVal: 50, lat: 0, long: 0, storages: [{lat: 43.0045047, long: -81.2762352, price: 50}, {lat: 43.0044500, long: -81.2450200, price: 55}] };
    this._getLocationAsync();
  }

  getStorage() {
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ 
      lat: location.coords.latitude, 
      long: location.coords.longitude
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 43.0045047,
            longitude: -81.2762352,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {
            this.state.storages.map( storage => 
              <MapView.Marker
                key={storage.lat.toString()}
                coordinate={{
                  latitude: storage.lat,
                  longitude: storage.long 
                }}
                onPress={e => this.props.navigation.navigate('Info')}
              >
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{"$" + storage.price}</Text>
                </View>
              </MapView.Marker>
            )
          }  
        </MapView>
        <Image style={styles.image} source={require("../assets/images/redo.png")} />
        <View style={styles.filter}>
          <Text style={styles.filterText}>Filter by Maximum Price</Text>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 6, paddingTop: 10}}>
              <Slider 
                thumbTintColor={colors.tintColor} 
                minimumTrackTintColor={colors.tintColor}
                maximumValue={150}
                value={this.state.sliderVal}
                onValueChange={ val => this.setState({ sliderVal: val })}
              />
            </View>
            <View style={{flex: 1, justifyContent: "flex-end"}}><Text style={{textAlign: "center", color: colors.tintColor}}>${Math.round(this.state.sliderVal)}</Text></View>
          </View> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 6
  },
  image: {
    position: "absolute",
    top: "5%",
    left: "3%",
    width: 80,
    height: 80
  },
  filter: {
    overflow: "hidden",
    width: "90%",
    borderRadius: 10,
    height: 80,
    textAlign: 'center',
    paddingTop: 5,
    top: "85%",
    left: "5%",
    position: 'absolute',
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  marker: {
    padding: 5,
    overflow: "hidden",
    backgroundColor: colors.tintColor,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  markerText: {
    color: "white",
    fontSize: 18
  }
});