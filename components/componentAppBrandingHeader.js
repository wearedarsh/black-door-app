import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
//components
import ComponentLogo from '../components/componentLogo'
import ComponentBackButton from './componentBackButton'
//style
import { LinearGradient } from 'expo-linear-gradient';

const ComponentAppBrandingHeader = (props) => {
    const { backButton = false, gradient = false, gradientHeight = 300, onPress = () => {}} = props
    return(
        <>
            { gradient && <View style={styles.gradient}><LinearGradient style={styles.gradient} colors={['rgba(35, 31, 32, 1)', 'rgba(35, 31, 32, 0)']} /></View>}
            <View style={styles.container}>
                { backButton && <ComponentBackButton onPress={onPress} /> }
                <ComponentLogo />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 128 : 100, 
        width:'100%', 
        alignItems: 'center', 
        justifyContent:'flex-end', 
        position:'absolute', 
        top:0,
        zIndex: 300
    },
    gradient:{
        position:'absolute',
        top: 0,
        width:'100%',
        height:300,
        zIndex: 299,
    }
})

export default ComponentAppBrandingHeader