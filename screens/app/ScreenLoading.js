import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'

const ScreenLoading = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.logo}>BLKDR</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: colors.white,
        fontSize: 48,
        fontFamily: 'hero'
    }
})

export default ScreenLoading

