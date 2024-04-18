import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
//incons
import { Ionicons } from '@expo/vector-icons'
//styles
import { colors } from '../../assets/style/theme'

const ComponentAdminSelectButton = (props) => {
    const { selected = false, onPress = () => {}, label = "set label prop"} = props
    return (
        <TouchableOpacity style={{...styles.btn, ...(selected ? styles.btnSelected : styles.btnUnselected)}} onPress={onPress}>
            <Text style={{...styles.label, ...(selected ? styles.labelSelected : styles.labelUnselected)}}>{label.toUpperCase()}</Text><Ionicons style={selected ? styles.iconSelected : styles.iconUnselected} size={24} name={selected ? "checkmark" : "close"}  />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height:48,
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    btnSelected: {
        backgroundColor: colors.primary
    },
    btnUnselected: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.secondary
    },
    label: {
        fontFamily: 'primary-regular',
        fontSize: 16,
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    },
    labelUnselected: {
        color: colors.secondary
    },
    labelSelected: {
        color: colors.white
    },
    iconSelected: {
        color: colors.white
    },
    iconUnselected: {
        color: colors.secondary
    }
})

export default ComponentAdminSelectButton;