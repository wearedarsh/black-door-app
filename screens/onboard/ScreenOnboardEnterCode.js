import React, { useState } from 'react'
import {View, Keyboard, TouchableOpacity, Text, StyleSheet, ImageBackground, Modal, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//components
import ComponentCodeEntry from '../../components/componentCodeEntry'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppFeedback from '../../components/componentAppFeedback'
import ComponentAppLoadingIndicator from '../../components/componentAppLoadingIndicator'
//style
import { colors } from '../../assets/style/theme'
//utils
import UtilsCodeManagement from '../../utils/utilsCodeManagement'
import UtilsValidation from '../../utils/utilsValidation'
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsEncryption from '../../utils/utilsEncryption'
//expo
import * as Network from 'expo-network'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, query, where } from "firebase/firestore"



const ScreenOnboardEnterCode = ({navigation}) => {
    //local state
    const [codeValue, setCodeValue] = useState('')
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    //local variables
    let hashedString
    //firestore
    const db = getFirestore(app)

    const verifyCode = async (code) => {
        let deviceIP = ''
        let codeId = ''
        setLoading(true)
        //fetch IP address of user
        try{
            deviceIP = await Network.getIpAddressAsync()
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //check if user in blocked list
        try{
            //build query to check
            const collectionRef = collection(db, 'blockedList')
            const whereRef = where("IP", "==", deviceIP)
            const queryRef = query(collectionRef, whereRef)
            //check if IP in block list
            const response = await UtilsFirestore.getDocumentsWhere({queryRef})
            if(response.success){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 10000, setterFunc:setFeedback, data: {title:'Sorry you have been blocked, if this is a mistake please contact the administrator', icon:'ios-warning'}})
                return
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        


        //check code exists in live codes table
        try{
            //create hashed version of code
            hashedString = await UtilsEncryption.returnHashedString({string: code})
            //create firestore friendly timestamp
            const firestoreTimeStamp = await UtilsFirestore.convertDateToFirestoreTimestamp({date:new Date()})
            //check if code exists
            const response = await UtilsCodeManagement.checkCodeExists({hashedCode: hashedString, firestoreTimeStamp: firestoreTimeStamp})
            //if code doesn't exist 
            if(response.error){
                //insert IP into code attempts collection
                const responseIP = UtilsFirestore.addDocument({currentCollection: 'codeAttempts', data: {IP: deviceIP, timestamp: firestoreTimeStamp, success: false}})
                //check how many fails in codeattempts collection
                const collectionRef = collection(db, 'codeAttempts')
                const whereIPRef = where("IP", "==", deviceIP)
                const whereSuccessRef = where("success", "==", false)
                const queryRef = query(collectionRef, whereIPRef, whereSuccessRef)

                const responseQuery = await UtilsFirestore.getDocumentsWhere({queryRef})
                
                if(responseQuery.numDocs >= 5){
                    const blockQuery = await UtilsFirestore.addDocument({currentCollection: 'blockedList', data: {IP: deviceIP, timestamp:firestoreTimeStamp}})
                    setLoading(false)
                    UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Sorry you have been blocked, if this is a mistake please contact the administrator', icon:'ios-warning'}})
                    return
                }
                
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }else{
                //insert IP into code attempts collection
                const responseIP = UtilsFirestore.addDocument({currentCollection: 'codeAttempts', data: {IP: deviceIP, timestamp: firestoreTimeStamp, success: true}})
                //get user id
                const { data, id } = response
                const { userId } = data
                //set code id for passing
                codeId = id
                //grab the user details and pass the data through root params to next screen
                const userDetails = await UtilsFirestore.getDocumentByKey({currentCollection: 'users', key: userId})
                if(!userDetails.error){
                    setLoading(false)
                    navigation.navigate('ScreenOnboardCheckDetails', {clientData: userDetails, userKey: userId, message: 'Code entered successfully', code: hashedString, codeId})
                    return
                }else{
                    setLoading(false)
                    UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:userDetails.error, icon:'ios-checkmark'}})
                    return
                }
                return
            }
        }catch(error){
            dispatch(setLoading({loading: false}))
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
    }
    return (
        <View style={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <ComponentAppBrandingHeader backButton={true} onPress={() => {navigation.navigate('ScreenOnboardHome')}}/>
                
                    <KeyboardAwareScrollView contentContainerStyle={{flex:1, justifyContent: 'center'}}>
                        <ComponentHeroTitle title="ENTER YOUR VIP ACCESS CODE" style={{marginVertical:48}} />
                        <ComponentCodeEntry codeValue={codeValue} setCodeValue={setCodeValue} fulfillFunction={verifyCode} />
                    </KeyboardAwareScrollView>
                
                {/* <View style={{height:80, backgroundColor:colors.primary, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="VERIFY CODE" onPress={()=>{verifyCode()}} />  
                </View> */}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
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
    modalView: { 
        flex:1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 64,
        backgroundColor: 'rgba(35, 31, 32, 0.8)'
    }
})

export default ScreenOnboardEnterCode