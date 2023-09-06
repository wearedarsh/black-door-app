import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
//style
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppIconCopy = (props) => {
    const { icon = true, iconName = 'earth', copy = 'set my copy prop', marginTop = 16 } = props
    return(
        <View style={{...styles.container, marginTop: marginTop}}>
            {icon && <Ionicons size={24} name={iconName} color={colors.white} /> }
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
        marginLeft:16,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0,
        textAlign:'center'
    }
})

export default ComponentAppIconCopy