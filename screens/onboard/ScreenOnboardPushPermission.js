import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, ScrollView, Modal } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentOnboardToggle from '../../components/componentOnboardToggle'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppFeedback from '../../components/componentAppFeedback'
import ComponentAppLoadingIndicator from '../../components/componentAppLoadingIndicator'
//utils
import UtilsValidation from '../../utils/utilsValidation'
import UtilsFirebaseAuth from '../../utils/utilsFirebaseAuth'
import UtilsFirestore from '../../utils/utilsFirestore'
//expo
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
//style
import { colors } from '../../assets/style/theme'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../../redux/actions/actionLoading'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, where, collection, updateDoc } from 'firebase/firestore'


const ScreenOnboardPushPermission = ({navigation, route}) => {
    //route params
    const { formValues, userKey, code, codeId } = route.params
    //local variables
    let userAuthId
    let userPushToken
    let clientData = {}
    //local state
    const [pushConfirm, setPushConfirm] = useState(true)
    const [emailConfirm, setEmailConfirm] = useState(true)
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    //firestore
    const db  = getFirestore(app)
    //push notifications register
    const registerForPushNotifications = async () => {
        
        const projectId = Constants.expoConfig.extra.eas.projectId

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
            
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                return { error: 'Failed to get push token for push notification' }
            }
            token = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data
        } else {
            return { error: 'Must use physical device for Push Notifications'}
        }
        return { token: token }
    }

    const createUserAccount = async () => {
        
        setLoading(true)
        //first check to see if user has allowed push notifications
        if(pushConfirm){
            try{
                const response = await registerForPushNotifications()
                if(response.error){
                    setLoading(false)
                    UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                    return
                }else{
                    clientData = {
                        ...formValues,
                        pushToken: response.token,
                        pushOptIn: true
                    }                    
                }
            }catch(error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
                return
            }
        }
        //check to see if user has opted in for email notifications
        if(emailConfirm){
            clientData = {
                ...clientData,
                emailOptIn: true
            }

        
        }
        //if ok then create a firebase auth user
        try{
            const response = await UtilsFirebaseAuth.createAuthUser({email: formValues.emailAddress, password: formValues.password})
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return   
            }
            //if all ok set clientData
            userAuthId = response
            //add userAuthID and update status to approved
            clientData = {
                ...clientData,
                authId: userAuthId,
                isActive: true,
                code

            }

            //remove password field from clientData
            delete clientData.password
        

        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //add user document on firestore
        try{
            const responseAuth = await UtilsFirestore.updateDocumentByKey({currentCollection: 'users', data: {...clientData}, key: userKey})
            
            if(responseAuth.error){
                console.log(responseAuth.error)
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:responseAuth.error, icon:'ios-warning'}})
                return   
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //update invite code to redeemed
        try{
            const response = UtilsFirestore.updateDocumentByKey({currentCollection: 'inviteCodes', data: {redeemed: true}, key: codeId})
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        setLoading(false)
        navigation.navigate('ScreenLoginEnterDetails', {message: 'Account created successfully'})
    }
     
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardCheckDetails', {userKey: userKey, clientData: formValues, code, codeId})}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <ComponentHeroTitle title="CLICK ALLOW TO RECEIVE YOUR EXCLUSIVE UPDATES" />
                        <View style={styles.form}>
                            <ComponentOnboardToggle title="RECEIVE EXCLUSIVE NOTIFICATIONS" selected={pushConfirm} setterFunc={setPushConfirm} />
                            <ComponentOnboardToggle title="RECEIVE EXCLUSIVE EMAILS" selected={emailConfirm} setterFunc={setEmailConfirm} />
                        </View>
                </View>
                <View style={{height:80, backgroundColor:colors.primary, width:'100%', flexDirection: 'row',marginTop: 32}}>
                        <ComponentOnboardSubmitBtn label="GET VIP ACCESS" onPress={createUserAccount} />  
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

export default ScreenOnboardPushPermission