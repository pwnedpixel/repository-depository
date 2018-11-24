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
        console.log(":)");
        that.setState({rentals: myJson, refreshing: false});
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
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
            <TouchableOpacity style={styles.flatview} onPress={() => this.props.navigation.navigate('Status')}>
              <View style={styles.leftCol}><Text style={styles.name}>{item.owner}</Text></View>
              <View style={styles.rightCol}><Text style={styles.price}>{"$" + item.price + "/month"}</Text></View>
            </TouchableOpacity>
          }
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.objectID}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  flatview: {
    justifyContent: 'center',
    padding: 15,
    flexDirection: 'row'
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
