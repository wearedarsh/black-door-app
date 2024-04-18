import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { colors } from '../assets/style/theme'

const ComponentOnboardSubmitBtn = (props) => {
    const { label, onPress } = props
    return (
        <TouchableOpacity style={{...styles.submitBtn, backgroundColor:colors.primary}} onPress={onPress}>
            <Text style={{...styles.submitBtnText}}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    submitBtnText:{
        color: colors.white,
        fontSize: 20,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingLeft: 3
    },
})

export default ComponentOnboardSubmitBtn