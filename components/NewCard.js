import React, { Component, } from 'react'
import { StyleSheet, Text, View, TextInput,Button,Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux'
import {purple, white,gray} from '../utils/colors';
import TextButton from './TextButton'
import  {  addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { toHome } from '../utils/helpers'

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
    },
    TextInputAnswer:{
      height: 100
    }
})

class NewCard extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        return {
            title:'Add Card'
        }
    }

  state={
    question:'',
    answer:''
  }
  
  constructor(props) {
    super(props)
    this.state = {
        question:'',
        answer:''
    }
  }
  
  onSubmit = () =>{
    const {question, answer} = this.state
    const {addCard, deck, goBack} = this.props
    if (question && answer) {
      const card = {
        question:question,
        answer:answer
      }
      addCard(deck.title, card)
      addCardToDeck(deck.title, card)
      goBack()
    }
  }
  
  onChangeQuestionText = (text) => {
    this.setState({question: text })
  }

  onChangeAnswerText = (text) => {
    this.setState({answer: text })
  }

  render() {
    const {deck} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add card to '{deck.title}' deck!</Text>
        <TextInput style={styles.textInput}  underlineColorAndroid={'transparent'} maxLength={50}  placeholder='Question' onChangeText={this.onChangeQuestionText}/>
        <TextInput style={[styles.textInput, styles.TextInputAnswer]}  underlineColorAndroid={'transparent'} maxLength={255}  multiline={true} placeholder='Answer' onChangeText={this.onChangeAnswerText}/>
        <TextButton style={styles.submitBtnText} onPress={this.onSubmit}>
          SUBMIT
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}) {
  const {title} = navigation.state.params
  return {
    deck: decks[title] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {title} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (title, card) => dispatch(addCard(title, card))
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(NewCard)
