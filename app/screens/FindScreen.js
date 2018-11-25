import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider,
  TouchableOpacity,
  Image
} from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import colors from '../constants/Colors';
import dimens from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

export default class FindScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { minStorage: 0, maxPrice: 50, lat: 0, long: 0, storages: [] };
    this._getStoragesAsync();
  }

  _getStoragesAsync = async () => {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getstorage?storageId=[]&onlyAvailable=true&getAll=true')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.setState({storages: myJson});
      });
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
            this.state.storages.filter(storage => storage.price < this.state.maxPrice).filter(storage => storage.size > this.state.minStorage).map( storage => 
              <MapView.Marker
                key={storage.objectID.toString()}
                coordinate={{
                  latitude: storage.lat,
                  longitude: storage.long 
                }}
                onPress={e => this.props.navigation.navigate('Info', {storage: storage})}
              >
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{"$" + storage.price}</Text>
                </View>
              </MapView.Marker>
            )
          }  
        </MapView>
        <View style={styles.refresh}>
          <TouchableOpacity onPress={() => { this._getStoragesAsync() }}><Ionicons name="md-refresh" size={60} color={colors.tintColor} /></TouchableOpacity>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Filters</Text>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1, paddingLeft: 5, justifyContent: "flex-end"}}><Text style={{textAlign: "center", color: colors.tintColor}}>Price</Text></View>
            <View style={{flex: 6, paddingTop: 10}}>
              <Slider 
                thumbTintColor={colors.tintColor} 
                minimumTrackTintColor={colors.tintColor}
                maximumValue={150}
                value={this.state.maxPrice}
                onValueChange={ val => this.setState({ maxPrice: val })}
              />
            </View>
            <View style={{flex: 1, justifyContent: "flex-end"}}><Text style={{textAlign: "center", color: colors.tintColor}}>${Math.round(this.state.maxPrice)}</Text></View>
          </View> 
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1, paddingLeft: 5, justifyContent: "flex-end"}}><Text style={{textAlign: "center", color: colors.tintColor}}>Size</Text></View>
            <View style={{flex: 6, paddingTop: 10}}>
              <Slider 
                thumbTintColor={colors.tintColor} 
                maximumTrackTintColor={colors.tintColor}
                minimumTrackTintColor={"#d3d3d3"}
                maximumValue={200}
                value={this.state.minStorage}
                onValueChange={ val => this.setState({ minStorage: val })}
              />
            </View>
            <View style={{flex: 1, justifyContent: "flex-end"}}><Text style={{textAlign: "center", color: colors.tintColor}}>{Math.round(this.state.minStorage)} m²</Text></View>
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
  refresh: {
    overflow: "hidden",
    borderRadius: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    top: "76%",
    left: "80.5%",
    position: 'absolute',
    backgroundColor: "white"
  },
  filter: {
    overflow: "hidden",
    width: "90%",
    borderRadius: 10,
    height: 110,
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