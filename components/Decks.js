import React, { Component, } from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, StatusBar,Platform, TouchableOpacity,ScrollView } from 'react-native'
import { Card, Button,Badge } from 'react-native-elements';

import {AppLoading} from 'expo'
import  { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import {purple, white,gray, black} from '../utils/colors';

class Decks extends Component {

 componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(()=> this.setState(()=>({
        ready:true
      })))

      console.log('componentDidMount')
  }

  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

shouldComponentUpdate(nextProps) {
  return true
}

  render() {
    const {decks} = this.props
    const {ready} = this.state

    if(ready === false ){
      <AppLoading />
    }


    
    if(Object.keys(decks).length === 0){
      return (
        <View style={{flex:1}}>
          <Text>
            Your decks list is enpty.
          </Text>
        </View>
      )
    }

   
    return (
      <ScrollView>
        {Object.keys(decks).map((key)=>{
          const {title, questions} = decks[key]
          if(title) {
            return (
              <View key={key}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                        'DeckDetail', {deckId: key}
                    )}>
                    <Card title={title} titleStyle={{fontSize:18}}>
                      <Text style={styles.cardNumber} >
                        {questions ? questions.length : 0}
                      </Text>
                    </Card>
                </TouchableOpacity>
              </View>
            )
          }
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      borderBottomWidth:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:6,
      backgroundColor:white
    },
    cardNumber:{
      textAlign:'center',
      fontSize:25,
      color:'orange'
    }

})

function mapStateToProps(decks)
{
    return {decks}
}
export default connect(mapStateToProps)(Decks)