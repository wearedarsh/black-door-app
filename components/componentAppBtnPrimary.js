import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppBtnPrimary = (props) => {
    const {label = 'SET MY LABEL PROP', onPress = () => {}, marginTop = 16, icon = false, iconName='earth', bgrColor = colors.gold} = props
    return( 
        <View style={{...styles.bgrWrapper, marginTop:marginTop, backgroundColor: bgrColor}}>
            <TouchableOpacity style={{...styles.btn, backgroundColor:bgrColor}} onPress={onPress}>
                { icon && <Ionicons style={styles.icon} size={24} name={iconName} color={colors.white} />}
                <Text style={styles.btnText}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bgrWrapper: {
        
    },
    btn: {
        height:48,
        backgroundColor: colors.gold,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginRight: 8
    },
    btnText: {
        textAlign:'center',
        color: colors.white,
        fontFamily: 'hero',
        fontSize: 20,
        letterSpacing:2,
        paddingLeft: Platform.OS === 'ios' ? 1 : 0
    }
})

export default ComponentAppBtnPrimary