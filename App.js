import React from 'react';
import { StyleSheet, Text, View, StatusBar,Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo'
import {FontAwesome, Ionicons} from '@expo/vector-icons';

import {purple, white, black} from './utils/colors';

import Decks from './components/Decks';
import NewDeck from './components/NewDeck';


function AppStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks:{
    screen:Decks,
    navigationOptions:{
      tabBarLabel:'Decks'
    }
  },
  NewDeck:{
    screen:NewDeck,
    navigationOptions:{
      tabBarLabel:'New Deck'
    }
  }
},{
    navigationOptions:{
      header:null,
    },
    tabBarOptions:{
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style:{
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
          width:0,
          height:3
        },
        shadowRadius:6,
        shadowOpacity:1
      }
    }
})

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  }
})

export default class App extends React.Component {
  componentDidMount(){
  }

  render() {
    return (
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={black} barStyle='light-content' />
          <MainNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
