import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FindScreen from '../screens/FindScreen';
import RentalsScreen from '../screens/RentalsScreen';
import ListingsScreen from '../screens/ListingsScreen';
import EditScreen from '../screens/EditScreen';
import StatusScreen from '../screens/StatusScreen';
import InfoScreen from '../screens/InfoScreen';

const FindStack = createStackNavigator({
  Find: FindScreen,
  Info: InfoScreen
});

FindStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-map'
      }
    />
  ),
};

const RentalsStack = createStackNavigator({
  Rentals: RentalsScreen,
  Status: StatusScreen
});

RentalsStack.navigationOptions = {
  tabBarLabel: 'Rentals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-cube'}
    />
  ),
};

const ListingsStack = createStackNavigator({
  Listings: ListingsScreen,
  Edit: EditScreen
});

ListingsStack.navigationOptions = {
  tabBarLabel: 'Listings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-cash'}
    />
  ),
};

export default createBottomTabNavigator({
  FindStack,
  RentalsStack,
  ListingsStack,
});
