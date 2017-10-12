import React, { Component, } from 'react'
import { StyleSheet, Text, View, TextInput,Button,Platform } from 'react-native'
import {purple, white,gray} from '../utils/colors';
import TextButton from './TextButton'

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
      height: 40, 
      borderColor:gray, 
      borderWidth:1,
      borderRadius:Platform.OS === 'ios' ? 7 : 2
    }
})

class NewDeck extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onSubmit = () =>{
    console.log('onSubmit Pressed.')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.textInput} placeholder='Deck title' />
        <TextButton style={styles.submitBtnText} onPress={this.onSubmit}>
          SUBMIT
        </TextButton>
      </View>
    )
  }
}

export default NewDeck