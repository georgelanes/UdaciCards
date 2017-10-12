import React, { Component, } from 'react'
import { StyleSheet, Text, View, StatusBar,Platform } from 'react-native'

class Decks extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Deck List View</Text>
      </View>
    )
  }
}

export default Decks