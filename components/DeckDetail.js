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
        const { deckId } = navigation.state.params


        return {
            title:deckId
        }
    }

    onSubmit = () =>{
        // const state = this.state

        // this.props.dispatch(addDeck({
        //     state
        // }))

        // this.setState(()=>({
        //     deckTitle:''
        // }))

        // saveDeckTitle(state.title)
  }

    render () {
        const {deck} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.total}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TextButton style={styles.addCardBtnText} onPress={()=> this.props.navigation.navigate(
                        'NewCard', {deckId: deck.title}
                    )}>
                        Add Card
                    </TextButton>
                    <TextButton style={styles.quizBtnText} onPress={this.onSubmit}>
                        Start Quiz
                    </TextButton>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, {navigation}){
    const {deckId} = navigation.state.params

    return {
        deckId,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(DeckDetail)