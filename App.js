import * as React from 'react';
import { AsyncStorage, StatusBar } from 'react-native'
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux'
import reducer from './Reducers/index'
import { createStore } from 'redux'
import {createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { blue } from './Utils/colors'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import Card from './components/Card'
import middleware from './middleware/index'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
  screen: AddDeck,
  navigationOptions: {
    tabBarLabel: 'AddDeck',
  }
}

})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  Card: {
    screen: Card
  }
})



export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={blue}
          barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
