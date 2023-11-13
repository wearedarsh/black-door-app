import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
//components
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentOnboardToggle from '../../components/componentOnboardToggle'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
//expo
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
//style
import { colors } from '../../assets/style/theme'


const ScreenOnboardPushPermission = ({navigation, route}) => {
    const { formValues, userKey } = route.params
    let userAuthId


    const registerForPushNotifications = async () => {
        let token
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
                console.log('I should be requesting permission now...')
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            token = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data
        } else {
            alert('Must use physical device for Push Notifications')
        }
        return token;
    }

    const createUserAccount = async () => {
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
                navigation.navigate('ScreenOnboardPushPermission', {key: userKey})
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error, icon:'ios-warning'}})
            return
        }
    }

     
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
            <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardCheckDetails')}} />
                <View style={{flex:8, justifyContent: 'center', marginTop: 32}}>
                <ComponentHeroTitle title="CLICK ALLOW TO RECEIVE YOUR EXCLUSIVE UPDATES" />
                    {/* <View style={styles.form}>
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE NOTIFICATIONS" />
                        <ComponentOnboardToggle title="RECEIVE EXCLUSIVE EMAILS" />
                    </View> */}
                </View>
                {/* <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="GET VIP ACCESS" onPress={()=>{navigation.navigate('ScreenOnboardCheckDetails')}} />  
                </View> */}
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

export default ScreenOnboardPushPermission