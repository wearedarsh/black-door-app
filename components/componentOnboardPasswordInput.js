import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import Ionicons from '@expo/vector-icons/Ionicons'


const ComponentOnboardPasswordInput = (props) => {
    const { label = 'PASSWORD', value = '', information = 'PASSWORD MUST BE A MINIMUM OF 8 CHARACTERS AND CONTAIN AT LEAST ONE NUMBER', onChangeText } = props
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.holder}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <TextInput style={styles.input} value={value} secureTextEntry={!showPassword} onChangeText={onChangeText} />
                <View style={styles.passwordBtn}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={32} color={colors.gold} onPress={()=>setShowPassword(!showPassword)} />
                </View>
            </View>
            <Text style={styles.information}>{information}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    holder: {
        width: '100%',
        alignItems: 'center'
    },
    information: {
        textAlign:'center',
        fontFamily: 'primary-bold',
        marginTop: 8,
        fontSize: 12,
        color: colors.white,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    },
    passwordBtn: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flexDirection:'row',
        justifyContent:'center',
        width: '100%',
        height:64,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: 'rgba(35, 31, 32, 0.7)',
        paddingLeft: 16
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
        flex:8,
        fontSize: 20,
        color: colors.white,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingRight: 16
    }
})

export default ComponentOnboardPasswordInput