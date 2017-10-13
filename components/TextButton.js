import React from 'react';
import { Text, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import {white,gray, purple,black} from '../utils/colors'

//style section
const styles = StyleSheet.create({
    textStyle:{
      textAlign:'center',
      color:white
    },
    btnStyle:{
      backgroundColor:black,
      borderWidth:1,
      borderRadius: Platform.OS === 'ios' ? 3 : 2,
    }
})

export default function TextButton ({children, onPress, style={}}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
            <Text style={[styles.textStyle, style]}> {children} </Text>
        </TouchableOpacity>
    )
}