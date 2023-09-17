import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
//components
import ComponentLogo from '../components/componentLogo'
import ComponentBackButton from './componentBackButton'
//style
import { LinearGradient } from 'expo-linear-gradient';

const ComponentAppBrandingHeader = (props) => {
    const { backButton = false, gradient = false, gradientHeight = Platform.OS === 'ios' ? 128 : 100, onPress = () => {}, gradientFrom = 'rgba(35, 31, 32, 1)', gradientTo = 'rgba(35, 31, 32, 1)'} = props
    return(
        <>
            { gradient && <View style={styles.gradient}><LinearGradient style={{...styles.gradient,height:gradientHeight}} colors={[gradientFrom, gradientTo]} /></View>}
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
        zIndex: 300,
        paddingBottom: 16
    },
    gradient:{
        position:'absolute',
        top: 0,
        width:'100%',
        zIndex: 299,
    }
})

export default ComponentAppBrandingHeader