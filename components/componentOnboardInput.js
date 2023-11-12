import React from 'react'
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'


const ComponentOnboardInput = (props) => {
    const { label, value, onChangeText } = props
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        width: '100%'
    },
    label: {
        fontFamily: 'primary-bold',
        marginBottom: 8,
        fontSize: 16,
        color: colors.white,
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
    input: {
        height:64,
        width:'100%',
        borderWidth:2,
        fontSize: 20,
        borderColor: colors.white,
        backgroundColor: 'rgba(35, 31, 32, 0.8)',
        color: colors.white,
        fontFamily: 'primary-regular',
        marginBottom: 20,
        paddingLeft:16

    }

})

export default ComponentOnboardInput