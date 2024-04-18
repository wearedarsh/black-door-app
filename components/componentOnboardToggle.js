import React, {useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
//styles
import { colors } from '../assets/style/theme'

const ComponentOnboardToggle = (props) => {
    const { title = 'set title prop', selected = true, setterFunc = () => {} } = props

    const toggleSelected = () => {
        setterFunc(prevValue => !prevValue)
    }
    
    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.row}>
                <TouchableOpacity style={{...styles.btn, ...(selected ? styles.btnTrue : styles.btnFalse)}} onPress={!selected ? toggleSelected : null}><Text style={styles.btnLabel}>YES</Text></TouchableOpacity>
                <TouchableOpacity style={{...styles.btn, ...(!selected ? styles.btnTrue : styles.btnFalse)}} onPress={selected ? toggleSelected : null}><Text style={styles.btnLabel}>NO</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        width: '40%',
        height:48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLabel : {
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16
    },
    btnTrue: {
        backgroundColor: colors.primary,
    },
    btnFalse: {
        backgroundColor: 'rgba(35, 31, 32, 0.7)',
        borderWidth: 2,
        borderColor: colors.white
    },
    label: {
        textAlign: 'center',
        fontFamily: 'primary-regular',
        marginTop: 32,
        marginBottom: 16,
        fontSize: 16,
        color: colors.white,
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
})

export default ComponentOnboardToggle