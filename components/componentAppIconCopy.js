import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
//style
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppIconCopy = (props) => {
    const { icon = 'earth', copy = 'set my copy prop', marginTop = 16 } = props
    return(
        <View style={{...styles.container, marginTop: marginTop}}>
            <Ionicons size={24} name={icon} color={colors.white} /> 
            <Text style={styles.copy}>{copy}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    copy:{
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16,
        marginLeft:16
    }
})

export default ComponentAppIconCopy