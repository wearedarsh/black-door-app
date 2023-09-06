import React, { useState } from 'react'
import {View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardPasswordInput from '../../components/componentOnboardPasswordInput'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
//style
import { colors } from '../../assets/style/theme'


const ScreenOnboardCheckDetails = ({navigation}) => {
    const [initialFormValues, setInitialFormValues] = useState({
        firstName: 'Thomas',
        lastName: 'Harley',
        emailAddress: 'harley@wearedarsh.com',
        mobileNumber: '07812036791',
        password: ''
    })
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardEnterCode')}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <ComponentHeroTitle title="CHECK YOUR ACCOUNT DETAILS" style={{marginTop:48, marginBottom: 32}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="FIRST NAME" value={initialFormValues.firstName} />
                        <ComponentOnboardInput label="LAST NAME" value={initialFormValues.lastName} />
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={initialFormValues.emailAddress} />
                        <ComponentOnboardInput label="MOBILE NUMBER" value={initialFormValues.mobileNumber} />
                    </View>
                    <ComponentHeroTitle title="CREATE YOUR PASSWORD" style={{marginTop:48, marginBottom: 32}} />
                    <View style={styles.form}>
                        <ComponentOnboardPasswordInput />
                    </View>
                    <View style={{height:80,marginTop:32}}>
                        <ComponentOnboardSubmitBtn label="CONFIRM" onPress={()=>{navigation.navigate('ScreenOnboardGDPR')}} />
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {        
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
        height: '100%',
        backgroundColor:colors.slate
    },
    form:{
        width:'100%',
        paddingHorizontal: 32
    }
})

export default ScreenOnboardCheckDetails