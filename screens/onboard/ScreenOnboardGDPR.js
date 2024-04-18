import React, { useState } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentOnboardToggle from '../../components/componentOnboardToggle'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
//style
import { colors } from '../../assets/style/theme'
//config
import configApp from '../../config/configApp'


const ScreenOnboardEnterCode = ({navigation}) => {
    const [pushCheck, setPushCheck] = useState(true)
    const [emailCheck, setEmailCheck] = useState(true)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardCheckDetails')}} />
                <View contentContainerStylestyle={{flex:8, justifyContent: 'center', marginTop: 32}}>
                <ComponentHeroTitle title="GET VIP UPDATES" />
                    <View style={styles.form}>
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE PUSH NOTIFICATIONS" value={pushCheck} />
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE EMAIL NOTIFICATIONS" value={emailCheck}  />
                        <Text style={styles.paragraph}>All notifications will be tailored for you from the {configApp.appName} and your data will never be shared with any third parties. You are able to opt out at any time in the settings section of your profile. </Text>
                    </View>
                </View>
                <View style={{height:80, backgroundColor:colors.primary, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="CREATE ACCOUNT" onPress={()=>{navigation.navigate('ScreenOnboardCheckDetails')}} />  
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {        
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
        height: '100%',
        backgroundColor: colors.secondary
    },
    form:{
        width:'100%',
        paddingHorizontal: 32
    },   
    paragraph: {
        fontSize: 16,
        fontFamily: 'primary-regular',
        color: colors.white,
        textAlign: 'center',
        paddingTop: 26
    }
})

export default ScreenOnboardEnterCode