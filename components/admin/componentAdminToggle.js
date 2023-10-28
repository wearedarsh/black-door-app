import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'

const ComponentAdminToggle = (props) => {
    const { title, selectedValue = false , setterFunction = () =>{}} = props
    
    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.row}>
                <TouchableOpacity style={{...styles.btn, ...(selectedValue ? styles.btnTrue : styles.btnFalse)}} onPress={setterFunction}><Text style={{...styles.btnLabel, ...(selectedValue ? styles.btnLabelTrue : styles.btnLabelFalse)}}>YES</Text></TouchableOpacity>
                <TouchableOpacity style={{...styles.btn, ...(!selectedValue ? styles.btnTrue : styles.btnFalse)}} onPress={setterFunction}><Text style={{...styles.btnLabel, ...(!selectedValue ? styles.btnLabelTrue : styles.btnLabelFalse)}}>NO</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    btn: {
        flex:1,
        height:48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnLabel : {
        fontFamily: 'primary-regular',
        fontSize: 16
    },
    btnLabelTrue : {
        color: colors.white,
    },
    btnLabelFalse: {
        color: colors.slate
    },
    btnTrue: {
        backgroundColor: colors.gold,
    },
    btnFalse: {
        borderWidth:1,
        borderColor: colors.slate,
    },
    label: {
        textAlign: 'center',
        fontFamily: 'primary-regular',
        marginBottom: 8,
        fontSize: 16,
        color: colors.gold,
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    },
})

export default ComponentAdminToggle