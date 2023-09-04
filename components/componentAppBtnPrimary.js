import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'

const ComponentAppBtnPrimary = (props) => {
    const {label = 'SET MY LABEL PROP', onPress = () => {}} = props
    return( 
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height:48,
        backgroundColor: colors.gold,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign:'center',
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16,
        letterSpacing:3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    }
})

export default ComponentAppBtnPrimary