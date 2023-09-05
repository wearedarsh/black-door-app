import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import Ionicons from '@expo/vector-icons/Ionicons';

const ComponentBackButton = (props) => {
    const { onPress } = props
    return (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <Ionicons name="chevron-back" size={32} color={colors.white} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        padding: 0,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 8,
        bottom: 8,
        zIndex: 99
    }
})

export default ComponentBackButton

