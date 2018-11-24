import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Button, FlatList, Text, RefreshControl} from 'react-native';
import ActionButton from 'react-native-action-button';
import colors from '../constants/Colors';

export default class ListingsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: 'Listings',
  };

  constructor(props){
    super(props);
    this.state = { refreshing: false, listings: [] };
    this._getUserListingsAsync();
  }

  _getUserListingsAsync = async () => {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getuser/?userId=' + this.props.screenProps.userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        return that._getListingsInfoAsync(myJson.offering);
      });
  }; 

  _getListingsInfoAsync = async (listings) => {
    let that = this;
    fetch('https://pwnedpixel.lib.id/repository-depository@dev/getstorage/?storageId=' + JSON.stringify(listings))
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(":)");
        that.setState({listings: myJson, refreshing: false});
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
    this._getUserListingsAsync();
  }

  render() {
    return (
      <View  style={styles.container}>
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
            data={this.state.listings}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity style={styles.flatview} onPress={() => this.props.navigation.navigate('Edit')}>
                <View style={styles.leftCol}><Text style={styles.name}>{item.location}</Text></View>
                <View style={styles.rightCol}><Text style={styles.price}>{"$" + item.price + "/month"}</Text></View>
              </TouchableOpacity>
            }
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.objectID}
          />
        </ScrollView>
        <ActionButton
          buttonColor={colors.tintColor}
          onPress={() => this.props.navigation.navigate('Edit') }
        />
      </View>
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
