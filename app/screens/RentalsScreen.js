import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Button, FlatList, Text,  RefreshControl } from 'react-native';
import colors from '../constants/Colors';

export default class RentalsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: 'Rentals',
  };

  constructor(props){
    super(props);
    this.state = { refreshing: false, rentals: [] };
    this._getUserRentalsAsync();
  }

  _getUserRentalsAsync = async () => {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getuser/?userId=' + this.props.screenProps.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        return that._getRentalsInfoAsync(myJson.renting);
      });
  };

  _getRentalsInfoAsync = async (rentals) => {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getstorage/?storageId=' + JSON.stringify(rentals))
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.setState({rentals: myJson, refreshing: false});
      });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._getUserRentalsAsync();
  }

  render() {
    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <FlatList
          data={this.state.rentals}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.flatview} onPress={() => this.props.navigation.navigate('Status', {storage: item})}>
              <View style={styles.row}>
                <View style={styles.leftCol}><Text style={styles.name}>{item.title}</Text></View>
                <View style={styles.rightCol}><Text style={styles.price}>{"$" + item.price + "/month"}</Text></View>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.objectID}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  flatview: {
    padding: 5,
    alignItems: 'center'
  },
  row: {
    overflow: "hidden",
    width: "95%",
    borderRadius: 10,
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftCol: {
    flex: 1
  },
  rightCol: {
    flex: 1,
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
