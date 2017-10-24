import React, { Component, } from 'react'
import { StyleSheet, Text, View, TextInput,Button,Platform } from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import {purple, white,gray} from '../utils/colors';
import TextButton from './TextButton'
import  { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:30,
      backgroundColor:white,
      justifyContent: 'space-between',
    },
    title:{
      fontSize:40,
      paddingTop:40,
      paddingBottom:20,
      textAlign:'center',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
    },
    submitBtnText:{
      fontSize:22,
      fontFamily: 'Cochin',
      padding:10
    },
    textInput:{
      fontSize:20,
      padding:10,
      fontFamily: 'Cochin',
      height: 45, 
      borderColor:gray, 
      borderWidth:1,
      borderRadius:Platform.OS === 'ios' ? 7 : 2
    }
})

class NewDeck extends Component {

  state={
    title:''
  }
  
  onSubmit = () =>{
        const {title} = this.state
        const {addDeck} = this.props

        if(!title){
          alert("Deck title is required!")
          return
        }

        addDeck(title)
        saveDeckTitle(title)
        this.toHome()
  }
  
  toHome() {
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
  }

  onChangeText = (text) => {
    this.setState({title: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.textInput} placeholder='Deck title' onChangeText={this.onChangeText} text={this.state.title}/>
        <TextButton style={styles.submitBtnText} onPress={this.onSubmit}>
          SUBMIT
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {decks}
}

export default connect(mapStateToProps,{addDeck})(NewDeck)
