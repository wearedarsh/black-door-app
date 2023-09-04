import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
//style
import { LinearGradient } from 'expo-linear-gradient';
//components
import ComponentLogo from '../components/componentLogo'

const ComponentAppLogoGradient = (props) => {
    return (
        <>
            <View style={styles.gradient}>
                <LinearGradient style={styles.gradient} colors={['rgba(35, 31, 32, 1)', 'rgba(35, 31, 32, 0)']} />
            </View>
            <View style={styles.logoHolder}>
                <ComponentLogo />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    logoHolder: {
        position:'absolute',
        top:64,
        zIndex:300
    },

    gradient:{
        position:'absolute',
        top: 0,
        width:'100%',
        height:300,
        zIndex: 299,
    },

})

export default ComponentAppLogoGradient