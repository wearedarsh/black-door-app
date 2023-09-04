import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../assets/style/theme'

const ScreenAppPropertyView = () => {
    return(
        <View style={styles.container}>
            <Text>Property View screen ready for action</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppPropertyView