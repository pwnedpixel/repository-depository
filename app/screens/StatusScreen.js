import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import colors from '../constants/Colors';
import dimens from '../constants/Layout'

export default class StatusScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: colors.tintColor},
    headerTintColor: colors.headerTintColor,
    title: "Storage Title",
  };

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
            data={storage.events}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity style={styles.flatview} onPress={() => {this.props.navigation.navigate('Event',{event: item})}}>
                <View style={styles.row}>
                  <View style={styles.leftCol}><Text style={styles.name}>{item.action}</Text></View>
                  <View style={styles.rightCol}><Text style={styles.price}>{(new Date(0)).setUTCSeconds(item.time)}</Text></View>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.time.toString()}
          />
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
