import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
//style
import { colors, brand } from '../../assets/style/theme'


const ScreenOnboardHome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader />
                <View style={{flex:8, justifyContent: 'center'}}>
                    <Text style={styles.hero}>{brand.appHomeStrapline}</Text>
                </View>
                <View style={{height:80, backgroundColor:colors.primary, width:'100%', flexDirection: 'row'}}>
                    <TouchableOpacity style={{...styles.authBtn, backgroundColor:colors.primary}} onPress={() => {navigation.navigate('ScreenOnboardEnterCode')}}>
                        <Text style={{...styles.authBtnText}}>{brand.signupButton}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.authBtn, backgroundColor:colors.secondary}} onPress={() => {navigation.navigate('ScreenLoginEnterDetails')}}>
                        <Text style={{...styles.authBtnText}}>{brand.loginButton}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
    hero: {
        fontFamily: 'primary-regular',
        fontSize: 24,
        color: colors.white,
        textAlign: 'center',
        letterSpacing: 8,
        paddingLeft: 8
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    authBtn: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    authBtnText:{
        color: colors.white,
        fontSize: 20,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingLeft: 3
    }

    
})

export default ScreenOnboardHome