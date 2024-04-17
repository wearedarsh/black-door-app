import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppBtnSecondary = (props) => {
    const {label = 'SET MY LABEL PROP', onPress = () => {}, iconName = 'earth', icon=true, marginTop = 16 } = props
    return( 
        <TouchableOpacity style={{...styles.btn, marginTop: marginTop}} onPress={onPress}>
            { icon && <Ionicons size={24} name={iconName} color={colors.white} />}
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
    },
    btnText: {
        textAlign:'center',
        color: colors.white,
        fontFamily: 'hero',
        fontSize: 20,
        letterSpacing:2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    }
})

export default ComponentAppBtnSecondary