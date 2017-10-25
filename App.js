import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, StatusBar,Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo'
import {MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import reducer  from './reducers'
import {purple, white, black} from './utils/colors';

import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';


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
      tabBarLabel:'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  NewDeck:{
    screen:NewDeck,
    navigationOptions:{
      tabBarLabel:'New Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
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
  },
  DeckDetail:{
    screen:DeckDetail,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      }
    }
  },
  NewCard:{
    screen:NewCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      }
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})

export default class App extends React.Component {
  componentDidMount(){
  }

  render() {
    return (
        <Provider store = {createStore(reducer)}>
          <View style={{flex:1}}>
            <AppStatusBar backgroundColor={black} barStyle='light-content' />
            <MainNavigator />
          </View>
        </Provider>
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
