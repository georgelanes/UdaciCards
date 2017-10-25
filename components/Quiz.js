import React, {PureComponent} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native'
import {connect} from 'react-redux'
import { Card } from 'react-native-elements';
//import {setLocalNotification, clearLocalNotification} from '../utils/notifications'
import {white, black, green, red, charcoal} from '../utils/colors'
import TextButton from './TextButton'
import Deck from './Deck'
import QuizCard from './QuizCard'

class Quiz extends PureComponent {

  state = {
    currentQuestionIndex: 0,
    correctAnswersCount: 0
  }

  componentDidMount() {
    //clearLocalNotification().then(setLocalNotification)
  }

  correctBtn() {
    this.setState((state) => {
      return {
        currentQuestionIndex: state['currentQuestionIndex'] + 1,
        correctAnswersCount: state['correctAnswersCount'] + 1
      }
    })
  }

  incorrectBtn() {
    this.setState((state) => {
      return {
        ...state,
        currentQuestionIndex: state['currentQuestionIndex'] + 1
      }
    })
  }

  restartQuiz() {
    this.setState({currentQuestionIndex: 0, correctAnswersCount: 0})
  }

  render() {
    const {currentQuestionIndex, correctAnswersCount} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if (currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLbl}>Your Score</Text>
            <Text style={styles.score}>{(correctAnswersCount / questions.length) * 100}
              %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, styles.goBackToDeckBtn]} onPress={() => goBack()}>
              <Text style={[styles.defaultBtn, styles.goBackToDeckBtnText]}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.restartQuizBtn]} onPress={() => this.restartQuiz()}>
              <Text style={[styles.defaultBtn, styles.restartQuizBtnText]}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[currentQuestionIndex]
    const {opacityFront, opacityBack, transformFrontY, transformBackY} = this.state
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    }
    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>
            {currentQuestionIndex + 1}/{questions.length}
        </Text>
        <View style={styles.card}>
            <QuizCard card={card}/>
        </View>
        <View style={styles.btnContainer}>
            <TextButton style={[styles.defaultBtn, styles.correctBtn]} onPress={() => this.correctBtn()}>
                Correct
            </TextButton>
            <TextButton style={[styles.defaultBtn, styles.incorrectBtn]} onPress={() => this.incorrectBtn()}>
                Incorrect
            </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  pagination: {
    flex: 1,
    alignItems: 'flex-start'
  },
  card: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  defaultBtn:{
    fontSize:22,
    fontFamily: 'Cochin',
    padding:10,
    color:white,
    borderWidth:0    
  },
  correctBtn: {
    backgroundColor: green,
  },
  incorrectBtn: {
    backgroundColor: red
  },
  goBackToDeckBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black
  },
  goBackToDeckBtnText: {
    color: black
  },
  restartQuizBtn: {
    backgroundColor: black
  },
  restartQuizBtnText: {
    color: white
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLbl: {
    fontSize: 36,
    color: charcoal
  },
  score: {
    fontSize: 48,
    color: green
  }
})

function mapStateToProps(decks, {navigation}) {
  const {title} = navigation.state.params
  return {
    deck: decks[title] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack()
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
