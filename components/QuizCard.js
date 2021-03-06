import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, Animated} from 'react-native'
import {red, black, blue,white} from '../utils/colors'
import TextButton from './TextButton'

class QuizCard extends Component {

  state = {
    flipToShow: 'Answer'
  }

  componentWillReceiveProps(nextProps) {
    const {card} = this.props
    if (card.question !== nextProps.card.question) {
      this.reset()
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    })

    this.animatedOpacityFrontValue = new Animated.Value(1);
    this.textOpacityFrontValue = 1;
    this.animatedOpacityFrontValue.addListener(({value}) => {
      this.textOpacityFrontValue = value;
    })

    this.animatedOpacityBackValue = new Animated.Value(0);
    this.textOpacityBackValue = 0;
    this.animatedOpacityBackValue.addListener(({value}) => {
      this.textOpacityBackValue = value;
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [
        0, 180
      ],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [
        0, 180
      ],
      outputRange: ['180deg', '360deg']
    })
  }

  reset() {
    if (this.value >= 90) {
      Animated.parallel([
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 0
        }),
        Animated.timing(this.animatedOpacityFrontValue, {
          toValue: 1,
          duration: 0,
        }),
        Animated.timing(this.animatedOpacityBackValue, {
          toValue: 0,
          duration: 0,
        })
      ]).start()
      this.setState({flipToShow: 'Answer'})
    }
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.parallel([
        Animated.spring(this.animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 10
        }),
        Animated.timing(this.animatedOpacityFrontValue, {
          toValue: 1,
          duration: 100,
        }),
        Animated.timing(this.animatedOpacityBackValue, {
          toValue: 0,
          duration: 0,
        })
      ]).start()
      this.setState({flipToShow: 'Answer'})
    } else {
      Animated.parallel([
        Animated.spring(this.animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10
        }),
        Animated.timing(this.animatedOpacityBackValue, {
          toValue: 1,
          duration: 100,
        }),
        Animated.timing(this.animatedOpacityFrontValue, {
          toValue: 0,
          duration: 0,
        })
      ]).start()
      this.setState({flipToShow: 'Question'})
    }
  }

  render() {
    const {card} = this.props;
    const {flipToShow} = this.state

    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ],
      opacity: this.animatedOpacityFrontValue
    }
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ],
      opacity: this.animatedOpacityBackValue
    }

    return (
      <View style={[styles.container]}>
        <View style={[styles.container]}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.content}>{card.question}</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.content}>{card.answer}</Text>
          </Animated.View>
        </View>
        <TextButton style={styles.btnQuestionAnswer} onPress={() => this.flipCard()}>{flipToShow}</TextButton>
      </View>
    )
  }
}

export default QuizCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
    
  },
  flipCard: {
    flex:1,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    alignSelf: 'center'
  },
  flipCardBack: {
    flex:1,
    alignItems: 'center',
    alignSelf: 'center'      
  },
  content: {
    flex: 1,
    color: black,
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnQuestionAnswer:{
    backgroundColor: white,
    color: black,
    fontSize: 18,
    fontFamily: 'Cochin',
    padding:10
  }
})
