import * as React from 'react';
import { AsyncStorage, StatusBar, Platform } from 'react-native'
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux'
import reducer from './Reducers/index'
import { createStore } from 'redux'
import {createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { green } from './Utils/colors'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import Card from './components/Card'
import NewQuestion from './components/NewQuestion'
import middleware from './middleware/index'
import {setLocalNotification} from './Utils/notifications'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function generateTabNavigator (ios) {
    console.log(ios)
    if (ios === 'ios') {
        return (createBottomTabNavigator({
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

        }))
    } else {
        return (createMaterialTopTabNavigator({
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

        },{
             tabBarOptions: {
            style: {
                backgroundColor: green,
            }
        }}))
    }

}

const Tabs = generateTabNavigator(Platform.OS)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  Card: {
    screen: Card
  },
  NewQuestion: {
    screen: NewQuestion
  }
})



export default class App extends React.Component {
    componentDidMount(){
        setLocalNotification()
    }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={green}
          barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
