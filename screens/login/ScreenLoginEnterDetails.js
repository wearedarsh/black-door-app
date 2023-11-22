import React, { useState, useEffect } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground, Platform, Modal } from 'react-native'
//custom
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//components
import ComponentLogo from '../../components/componentLogo'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardPasswordInput from '../../components/componentOnboardPasswordInput'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppFeedback from '../../components/componentAppFeedback'
import ComponentAppLoadingIndicator from '../../components/componentAppLoadingIndicator'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
//utils
import UtilsValidation from '../../utils/utilsValidation'
//style
import { colors } from '../../assets/style/theme'


const ScreenLoginEnterDetails = ({navigation, route}) => {
    //route params
    const { message = '' } = route.params ?? {}
    //localstate
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    //check to see if message passed
    useEffect(() => {
        if(message){
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:message, icon:'ios-warning'}})
        }
    },[])
    //form values 
    const [formValues, setFormValues] = useState({
        emailAddress: '',
        password: ''
    })
    //update form values
    const updateFormFields = (string, key) => {
        setFormValues(prevState => ({
          ...prevState,
          [key]: string
        }))
    }

    const formSubmit = () => {
        //check both fields are populated



    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardHome')}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <ComponentHeroTitle title="WELCOME BACK" style={{marginVertical:48}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                        <ComponentOnboardPasswordInput information={''} value={formValues.password} onChangeText={newValue => updateFormFields(newValue, 'password')} />
                        <TouchableOpacity style={styles.forgotten}><Text style={styles.forgottenText} onPress={() => {navigation.navigate('ScreenLoginForgottenPassword')}}>FORGOTTEN PASSWORD?</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="LOG IN" onPress={()=>{navigation.navigate('ScreenAppHome')}} />
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {        
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
    },
    modalView: { 
        flex:1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64,
        backgroundColor: 'rgba(35, 31, 32, 0.8)'
    }
})

export default ScreenLoginEnterDetails