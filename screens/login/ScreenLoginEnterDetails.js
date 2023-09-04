import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground, Platform } from 'react-native'
//components
import ComponentLogo from '../../components/componentLogo'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardPasswordInput from '../../components/componentOnboardPasswordInput'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
//style
import { colors } from '../../assets/style/theme'


const ScreenLoginEnterDetails = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <View style={{flex:2}}>
                    <View style={{marginTop:64}}>
                        <ComponentBackButton onPress={() => {navigation.navigate('ScreenOnboardHome')}} />
                        <ComponentLogo />
                    </View>
                </View>
                <View style={{flex:8, justifyContent: 'flex-start'}}>
                    <ComponentHeroTitle title="WELCOME BACK" style={{marginVertical:48}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={''} />
                        <ComponentOnboardPasswordInput information=' ' />
                        <TouchableOpacity style={styles.forgotten}><Text style={styles.forgottenText} onPress={() => {navigation.navigate('ScreenLoginForgottenPassword')}}>FORGOTTEN PASSWORD?</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="LOG IN" onPress={()=>{navigation.navigate('ScreenAppHome')}} />
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
    forgotten: {
        width:'100%',
        height: 48,
        marginTop: 32
    },
    forgottenText: {
        textAlign: 'center',
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
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

export default ScreenLoginEnterDetails