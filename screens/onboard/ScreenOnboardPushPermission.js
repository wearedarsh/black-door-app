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


const ScreenOnboardPushPermission = ({navigation, route}) => {
    //route params
    const { formValues, userKey } = route.params
    //local variables
    let userAuthId
    let userPushToken
    let clientData = {}
    //local state
    const [pushConfirm, setPushConfirm] = useState(true)
    const [emailConfirm, setEmailConfirm] = useState(true)
    const [feedback, setFeedback] = useState(false)
    //redux
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loadingState.loading)
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
        dispatch(setLoading({loading: true}))
        //first check to see if user has allowed push notifications
        if(pushConfirm){
            try{
                const response = await registerForPushNotifications()
                if(response.error){
                    dispatch(setLoading({loading: false}))
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
                dispatch(setLoading({loading: false}))
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
                dispatch(setLoading({loading: false}))
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return   
            }else{
                userAuthId = response
                //add userAuthID and update status to approved
                clientData = {
                    ...clientData,
                    authId: userAuthId,
                    status: 1
                }
                //remove password field from clientData
                delete clientData.password
            }
        }catch(error){
            dispatch(setLoading({loading: false}))
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //add authkey to user on firestore
        try{
            const responseAuth = await UtilsFirestore.updateDocumentByKey({currentCollection: 'users', data: {...clientData}, key: userKey})
            if(responseAuth.error){
                dispatch(setLoading({loading: false}))
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:responseAuth.error, icon:'ios-warning'}})
                return   
            }

        }catch(error){
            dispatch(setLoading({loading: false}))
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //remove code from codes document
        try{
            const response = await UtilsFirestore.removeFieldFromDocument({currentCollection: 'config', key: 'inviteCodes', field: clientData.code})
            if(response.error){
                dispatch(setLoading({loading: false}))
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }
        }catch(error){
            dispatch(setLoading({loading: false}))
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }

        dispatch(setLoading({loading: false}))
        navigation.navigate('ScreenLoginEnterDetails', {message: 'Account created successfully'})
    }
     
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardCheckDetails', {clientData: formValues, userKey})}} />
                <View style={{flex:8, justifyContent: 'flex-start', marginTop:128}}>
                    <ComponentHeroTitle title="CLICK ALLOW TO RECEIVE YOUR EXCLUSIVE UPDATES" />
                        <View style={styles.form}>
                            <ComponentOnboardToggle title="RECEIVE EXCLUSIVE NOTIFICATIONS" selected={pushConfirm} setterFunc={setPushConfirm} />
                            <ComponentOnboardToggle title="RECEIVE EXCLUSIVE EMAILS" selected={emailConfirm} setterFunc={setEmailConfirm} />
                        </View>
                </View>
                <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row',marginTop: 32}}>
                        <ComponentOnboardSubmitBtn label="GET VIP ACCESS" onPress={createUserAccount} />  
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