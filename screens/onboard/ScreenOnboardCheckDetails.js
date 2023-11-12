import React, { useState } from 'react'
import {View, StyleSheet, ImageBackground, ScrollView, Modal } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardPasswordInput from '../../components/componentOnboardPasswordInput'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppFeedback from '../../components/componentAppFeedback'
import ComponentAppLoadingIndicator from '../../components/componentAppLoadingIndicator'
//style
import { colors } from '../../assets/style/theme'
//utils
import UtilsValidation from '../../utils/utilsValidation'
import UtilsFirebaseAuth from '../../utils/utilsFirebaseAuth'
import UtilsFirestore from '../../utils/utilsFirestore'


const ScreenOnboardCheckDetails = ({navigation, route}) => {
    //client object
    const { clientData, userKey } = route.params
    const { firstName, lastName, emailAddress, mobileNumber } = clientData
    //local state
    const [formValues, setFormValues] = useState({
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    //update form fields
    const updateFormFields = (string, key) => {
        setFormValues(prevState => ({
          ...prevState,
          [key]: string
        }))
    }

    let userAuthId

    const confirmDetails = async () => {
        setLoading(true)
        //check all fields are populated
        if(!UtilsValidation.inputsPopulated({data: formValues})){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please complete all fields', icon:'ios-warning'}})
        }
        //check email address is correct format
        if(!UtilsValidation.isEmail({email: formValues.emailAddress})){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please enter a valid email address', icon:'ios-warning'}})
            return
          }
        //check password valid
        const response = await UtilsValidation.isValidPassword({password: formValues.password})
        if(response.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
            return
        }
        //if ok then create a firebase auth user
        try{
            const response = await UtilsFirebaseAuth.createAuthUser({email: formValues.emailAddress, password: formValues.password})
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return   
            }else{
                userAuthId = response
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error, icon:'ios-warning'}})
            return
        }
        //add authkey to user on firestore
        try{
            const responseAuth = await UtilsFirestore.updateDocumentByKey({currentCollection: 'clients', data: {authId: userAuthId}, key: userKey})
            if(responseAuth.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:responseAuth.error, icon:'ios-warning'}})
                return   
            }else{
                setLoading(false)
                navigation.navigate('ScreenLoginEnterDetails', {feedback: 'Account successfully created, please log in'})
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error, icon:'ios-warning'}})
            return
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardEnterCode')}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <ComponentHeroTitle title="CHECK YOUR ACCOUNT DETAILS" style={{marginTop:48, marginBottom: 32}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="FIRST NAME" value={formValues.firstName} onChangeText={newValue => updateFormFields(newValue, 'firstName')} />
                        <ComponentOnboardInput label="LAST NAME" value={formValues.lastName} onChangeText={newValue => updateFormFields(newValue, 'lastName')} />
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                        <ComponentOnboardInput label="MOBILE NUMBER" value={formValues.mobileNumber} onChangeText={newValue => updateFormFields(newValue, 'mobileNumber')} />
                    </View>
                    <ComponentHeroTitle title="CREATE YOUR PASSWORD" style={{marginTop:48, marginBottom: 32}}  />
                    <View style={styles.form}>
                        <ComponentOnboardPasswordInput value={formValues.password}onChangeText={newValue => updateFormFields(newValue, 'password')} />
                    </View>
                    <View style={{height:80,marginTop:32}}>
                        <ComponentOnboardSubmitBtn label="CONFIRM" onPress={()=>{confirmDetails()}} />
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

export default ScreenOnboardCheckDetails