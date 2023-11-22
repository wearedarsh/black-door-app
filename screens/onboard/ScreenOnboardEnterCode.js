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


const ScreenOnboardEnterCode = ({navigation}) => {
    //local state
    const [codeValue, setCodeValue] = useState('')
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)

    const verifyCode = async (code) => {
        
        setLoading(true)
        //check code exists in live codes table
        try{
            const response = await UtilsCodeManagement.checkCodeExists({code: code})
            //if yes then 
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                return
            }else if(response.userKey){
                    const { userKey } = response
                    //grab the user details and pass the data through root params to next screen
                    const userDetails = await UtilsFirestore.getDocumentByKey({currentCollection: 'clients', key: userKey})
                    if(!userDetails.error){
                        setLoading(false)
                        navigation.navigate('ScreenOnboardCheckDetails', {clientData: userDetails, userKey: userKey, message: 'Code entered successfully'})
                        return
                    }else{
                        setLoading(false)
                        UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:userDetails.error, icon:'ios-checkmark'}})
                        return
                    }
            }else{
                    setLoading(false)
                    UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Invalid Code', icon:'ios-warning'}})
                    return
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error, icon:'ios-warning'}})
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
                
                {/* <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="VERIFY CODE" onPress={()=>{verifyCode()}} />  
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