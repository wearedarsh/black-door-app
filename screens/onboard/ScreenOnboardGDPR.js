import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentLogo from '../../components/componentLogo'
import ComponentOnboardToggle from '../../components/componentOnboardToggle'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
//style
import { colors } from '../../assets/style/theme'


const ScreenOnboardEnterCode = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <View style={{flex:2}}>
                    <View style={{marginTop:64}}>
                        <ComponentBackButton onPress={() => {navigation.navigate('ScreenOnboardHome')}} />
                        <ComponentLogo />
                    </View>
                </View>
                <View style={{flex:8, justifyContent: 'flex-start', marginTop: 32}}>
                <ComponentHeroTitle title="GET VIP UPDATES" />
                    <View style={styles.form}>
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE NOTIFICATIONS" />
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE EMAILS" />
                    </View>
                </View>
                <View style={{flex:1.2, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="GET VIP ACCESS" onPress={()=>{navigation.navigate('ScreenOnboardCheckDetails')}} />  
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: colors.slate,
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
    form:{
        width:'100%',
        paddingHorizontal: 32
    }   
})

export default ScreenOnboardEnterCode