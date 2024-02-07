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
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsFirebaseAuth from '../../utils/utilsFirebaseAuth'
import UtilsSecureStorage from '../../utils/utilsSecureStorage'
//style
import { colors } from '../../assets/style/theme'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { setUserAuth } from '../../redux/actions/actionUserAuth'
import { setLoading } from '../../redux/actions/actionLoading'


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
    //redux
    const dispatch = useDispatch()
    const userAuthState = useSelector(state => state.userAuthState)

    const formSubmit = async () => {
        setLoading(true)
        let authUserKey
        let authId
        let authToken
        let userDoc
        let isAdmin
        //check both fields are populated
        try{
            const formPopulated  = await UtilsValidation.inputsPopulated({data: formValues})
            if(!formPopulated){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please enter your email and password', icon:'ios-warning'}})
                return
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //check authentication and try to sign in user
        try{
            const response = await UtilsFirebaseAuth.signInUser({email: formValues.emailAddress, password: formValues.password})
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }else{
                authId = response.uid
                authToken = response.idToken
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //request doc from firestore
        try{
            const response = await UtilsFirestore.getDocumentWhere({currentCollection: 'users', conditions: [{fieldName: 'authId', operator: '==', fieldValue: authId}]})
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }else{
                userDoc = response.docData
                authUserKey = response.key
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }

        //check to see if account activated
        if(!userDoc.isActive){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Account not active', icon:'ios-warning'}})
            return
        }
        //check to see if account deleted
        if(userDoc.isDeleted){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'This account does not exist', icon:'ios-warning'}})
            return
        }
        //check to see if admin 
        if(userDoc.isAdmin){
            isAdmin = true
        }else{
            isAdmin = false
        }
        //add to secure storage
        try{
            
            await UtilsSecureStorage.addToSecureStorage({ key: 'authUserKey', value: authUserKey})
            await UtilsSecureStorage.addToSecureStorage({ key: 'authId', value: authId})
            await UtilsSecureStorage.addToSecureStorage({ key: 'authToken', value: authToken})
            await UtilsSecureStorage.addToSecureStorage({ key: 'authDoc', value: JSON.stringify(userDoc)})
            await UtilsSecureStorage.addToSecureStorage({ key: 'authIsAdmin', value: isAdmin ? 'true' : 'false' })
            
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //update state
        try{
            setLoading(false)
            await dispatch(setUserAuth({authUserKey: authUserKey, authId: authId, authToken: authToken, authDoc: userDoc, authIsAdmin: isAdmin ? 'true' : 'false'}))
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
    }

    return (
        <View style={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardHome')}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <KeyboardAwareScrollView >
                    <ComponentHeroTitle title="ENTER YOUR DETAILS" style={{marginVertical:48}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                        <ComponentOnboardPasswordInput information={''} value={formValues.password} onChangeText={newValue => updateFormFields(newValue, 'password')} />
                        <TouchableOpacity style={styles.forgotten}><Text style={styles.forgottenText} onPress={() => {navigation.navigate('ScreenLoginForgottenPassword')}}>FORGOTTEN PASSWORD?</Text></TouchableOpacity>
                    </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="LOG IN" onPress={formSubmit} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        backgroundColor: colors.slate,
        alignItems: 'center',
        justifyContent: 'center'
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