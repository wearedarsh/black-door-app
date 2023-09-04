import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ScreenAppHome = () => {
    return(
        <View style={styles.container}>
            <Text>Home screen ready for action</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: { 
        color: 'black'
    }
})

export default ScreenAppHome