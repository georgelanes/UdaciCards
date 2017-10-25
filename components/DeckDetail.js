import React, { Component, } from 'react'
import { StyleSheet, Text, View, TextInput,Button,Platform } from 'react-native'
import {connect} from 'react-redux'
import {purple, white,gray,black} from '../utils/colors';
import TextButton from './TextButton'
import  {  addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:30,
      backgroundColor:white,
    },
    btnContainer:{
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        fontSize:30,
        alignItems: 'center',
        textAlign:'center',
    },
    total:{
        fontSize:20,
        alignItems: 'center',
        textAlign:'center',
        color:gray
    },
    quizBtnText:{
      fontSize:22,
      fontFamily: 'Cochin',
      padding:10,
    },
    addCardBtnText:{
        fontSize:22,
        fontFamily: 'Cochin',
        padding:10,
        backgroundColor:white,
        color:black,
        borderWidth:1
    }
})

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title:title
        }
    }

    render () {
        const {deck, goToAddCard, goToQuiz} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.total}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TextButton style={styles.addCardBtnText} onPress={()=> goToAddCard(deck.title)}>
                        Add Card
                    </TextButton>
                    <TextButton style={styles.quizBtnText} onPress={() => goToQuiz(deck.title)}>
                        Start Quiz
                    </TextButton>
                </View>
            </View>
        )
    }
}

function mapStateToProps(decks, {navigation}) {
    const {title} = navigation.state.params
    return {
      deck: decks[title] || {},
      decks
    }
  }
  
  function mapDispatchToProps(dispatch, {navigation}) {
    const {title} = navigation.state.params
  
    return {
      goBack: () => navigation.goBack(),
      goToAddCard: (title) => navigation.navigate('NewCard', {title: title}),
      goToQuiz: (title) => navigation.navigate('Quiz', {title: title})
    }
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)