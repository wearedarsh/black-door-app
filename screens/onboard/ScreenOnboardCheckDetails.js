import React, { useState } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
//components
import ComponentLogo from '../../components/componentLogo'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardPasswordInput from '../../components/componentOnboardPasswordInput'
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
                <View style={{justifyContent:'flex-end', marginTop:64}}>
                    <ComponentBackButton onPress={() => {navigation.navigate('ScreenOnboardEnterCode')}} />
                    <ComponentLogo />
                </View>
                <View style={{flex:8, justifyContent: 'flex-start'}}>
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
                    <TouchableOpacity style={{...styles.btn, backgroundColor:colors.gold, marginTop:32}} onPress={()=>{navigation.navigate('ScreenOnboardGDPR')}}>
                            <Text style={{...styles.authBtnText}}>CONFIRM</Text>
                    </TouchableOpacity>
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
    },
    btn: {
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        width:'100%',
        paddingHorizontal: 32
    },

    authBtnText:{
        color: colors.white,
        fontSize: 20,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingLeft: 3
    }

    
})

export default ScreenOnboardCheckDetails