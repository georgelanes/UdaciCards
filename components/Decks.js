import React, { Component, } from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, StatusBar,Platform, TouchableOpacity } from 'react-native'
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
  }

  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  render() {
    const {decks} = this.props
    const {ready} = this.state

    if(ready === false ){
      <AppLoading />
    }
    
    console.log("decks list")
    console.log(decks)
    
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
      <View>
        {Object.keys(decks).map((key)=>{
          const {title, questions} = decks[key]
          return (

              <View key={key} style={styles.container}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                    'DeckDetail', {deckId: key}
                )}>
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.total}>{questions ? questions.length : 0}</Text>
                  </View>
                </TouchableOpacity>
              </View>
           
            )
        })}
      </View>
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
    title:{
      fontSize:30,
      alignItems: 'center',
      textAlign:'center',
      
    },
    total:{
      fontSize:25,
      alignItems: 'center',
      textAlign:'center',
      color:gray
    }

})

function mapStateToProps(decks)
{
    return {decks}
}
export default connect(mapStateToProps)(Decks)