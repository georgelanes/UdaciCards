import React, { Component, } from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, StatusBar,Platform, TouchableOpacity,ScrollView } from 'react-native'
import { Card } from 'react-native-elements';
import { AppLoading } from 'expo'

import { receiveDecks } from '../actions'
import { getDecks,clearDB } from '../utils/api'
import { purple, white, gray, black } from '../utils/colors';
import Deck from './Deck'

class Decks extends Component {

  state = {
    ready: false
  }

  constructor(props){
    super(props)
  }
 componentDidMount() {
    const { receiveDecks } = this.props

    getDecks()
      .then((decks) => receiveDecks(decks))
      .then(()=> this.setState(()=>({
        ready:true
      })))
  }

  render() {
    const {decks} = this.props
    const {ready} = this.state


    console.log(decks)

    if(ready === false ){
      return <AppLoading />
    }
    
    if(Object.keys(decks).length === 0){
      return (
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>
            Your decks list is empty.
          </Text>
        </View>
      )
    }

   
    return (
      <ScrollView>
        {Object.keys(decks).map((key)=>{
          const {title, questions} = decks[key]
          return (
            <View key={key}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('DeckDetail', {title: key} )}>
                <Deck id={key} title={title} questions={questions}/>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    emptyTextContainer:{
      flex:1,
      alignItems: 'center',
      padding:20,
      justifyContent: 'center',
    },
    emptyText:{
      fontSize:30,
    }

})

function mapStateToProps(decks)
{
    return {decks}
}
export default connect(mapStateToProps,{receiveDecks})(Decks)