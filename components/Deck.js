import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Card } from 'react-native-elements';
import {charcoal, black, gray} from '../utils/colors'

class Deck extends Component {
  render() {
    const {id, title, questions, bigFonts} = this.props;
    return (
      <View>
        <Card title={title} titleStyle={{fontSize:18}}>
            <Text style={styles.cardNumber} >
                {questions ? questions.length : 0}
            </Text>
        </Card>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  cardNumber:{
    textAlign:'center',
    fontSize:25,
    color:'orange'
  }
})
