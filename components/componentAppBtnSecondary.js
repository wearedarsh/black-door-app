import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppBtnSecondary = (props) => {
    const {label = 'SET MY LABEL PROP', onPress = () => {}, icon = 'earth'} = props
    return( 
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Ionicons size={24} name={icon} color={colors.white} /> 
            <Text style={styles.btnText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height:48,
        backgroundColor: 'rgba(35, 31, 32, 0.8)',
        borderWidth: 2,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    btnText: {
        textAlign:'center',
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16,
        letterSpacing:2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    }
})

export default ComponentAppBtnSecondary