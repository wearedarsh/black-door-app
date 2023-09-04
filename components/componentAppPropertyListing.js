import React from 'react'
import { View, Touchable, ImageBackground, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur';
//components
import ComponentAppBtnPrimary from '../components/componentAppBtnPrimary'

const ComponentAppPropertyListing = (props) => {
    return (
        <ImageBackground source={require('../assets/img/demo-property-image.png')} style={styles.backgroundImage}>
            <View intensity={24} style={styles.blurView}>
                <Text style={{...styles.textContent, textAlign: 'center'}}>PENTHOUSE APARTMENT WITH DOWNTOWN VIEWS</Text>
            </View>
            <View intensity={24} style={styles.blurView}>
                    <Ionicons style={styles.infoIcon} name={'map-outline'} size={24} color={colors.white} onPress={()=>setShowPassword(!showPassword)} />
                    <Text style={styles.textContent}>NYC</Text>
            </View>
            <View intensity={24} style={styles.blurView}>
                <Ionicons style={styles.infoIcon} name={'resize'} size={24} color={colors.white} onPress={()=>setShowPassword(!showPassword)} />
                <Text style={styles.textContent}>3,000 SQ FT</Text>
            </View>
            <View style={styles.btnHolder}>
                <ComponentAppBtnPrimary label={'VIEW PROPERTY'} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex:1,
        justifyContent: 'flex-end',
        width:'100%'
    },
    blurView: {
        flexDirection: 'row',
        marginBottom: 16,
        marginHorizontal: 32,
        padding:12,
        backgroundColor: 'rgba(35, 31, 32, 0.7)'
    },
    btnHolder: {
        marginHorizontal: 32,
        marginBottom: 32
    },
    textContent: {
        fontFamily: 'primary-medium',
        fontSize: 16,
        color: colors.white,
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
    infoIcon:{
        marginRight:8
    }
})

export default ComponentAppPropertyListing