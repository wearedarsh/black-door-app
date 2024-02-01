import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminCodeEntry from '../../components/admin/componentAdminCodeEntry'
//styles
import { colors } from '../../assets/style/theme'
//utils
import UtilsValidation from '../../utils/utilsValidation'
import UtilsCodeManagement from '../../utils/utilsCodeManagement'
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsEmail from '../../utils/utilsEmail'

const ScreenAdminClientCreateCode = ({route, navigation}) => {
    //route params
    const { clientData, userKey, codeKey, user } = route.params
    const { firstName, emailAddress } = clientData
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [codeValue, setCodeValue] = useState('')

    //send email to client function
    const sendInviteEmailToCustomer = async () => {
        setLoading(true)
        try{
          const response = await UtilsEmail.sendSingleTemplateEmail({
            emailSubjectTemplate: 'newCode', 
            emailContentTemplate: 'newCode',
            fromEmailNameTemplate: 'adminStandard',
            fromEmail: 'adminStandard',
            recipient: emailAddress,
            mergeFieldsArray: [
              {field: '%firstName%', 
              value: firstName}, 
              {field: '%inviteCode%', 
              value: codeValue}]
          })
          if(!response.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Code added and invite email sent to client', icon:'ios-checkmark'}})
            return
          }
        }catch(error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
          return
        }
      }
    //ask if send email function
    const confirmSendEmail = async () => {
        Alert.alert('Client Added', 'Would you like to send an email notification?', [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => {
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Code successfully added', icon:'ios-checkmark'}})
              return
            }
          },
          {
            text: 'Yes', 
            onPress: () => {
              sendInviteEmailToCustomer()
              setLoading(false)
            }
          },
        ])
      }
    //form submit function
    const submitForm = async () => {
        setLoading(true)
        //check if code correct length
        if(!UtilsValidation.checkStringLength({string: codeValue, expectedLength: 4})){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please enter a four digit code', icon:'ios-warning'}})
            return
        }
        //hash the code ready for usage
        const hashedString = await UtilsEncryption.returnHashedString({string: codeValue})
        //check if there is a live code already
        try{
            //convert current date to timestamp for comparison
            const firestoreTimeStamp = await UtilsFirestore.convertDateToFirestoreTimestamp({date:new Date()})
            //check to see if the code exists and is valid
            const codeExists = await UtilsCodeManagement.checkCodeExists({hashedCode: hashedString, firestoreTimeStamp: firestoreTimeStamp})
            //if it exists let the user know
            if(codeExists.success){
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'This code is already in use please create a different code', icon:'ios-warning'}})
              return
            }
          }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title: error.message, icon:'ios-warning'}})
            return
          }
        //try to add code to firestore
        try{
            //create date 48 hours from now
            const currentDate = new Date()
            const futureDate = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000)
            setLoading(true)
            const response = await UtilsCodeManagement.addCode({ hashedCode:hashedString, userId: userKey, redeemed: false, expiresAt: futureDate })
            if(response.error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 5000, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                console.log(response.error)
                return
            }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
        }
        //if there is a code already live for client
        if(codeKey){
            //delete from firestore
            try{
                const response = UtilsFirestore.deleteDocumentByKey({currentCollection: 'inviteCodes', key: codeKey})
                if(response.error){
                    setLoading(false)
                    UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
                    return
                }
            }catch(error){
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
                return
            }
        }

        //check to see if user would like to send an email to the client
        await confirmSendEmail()
        //reset the code field value
        setCodeValue('')
        setLoading(false)
    }


    return (
        <>
              <ComponentAdminHeader backButton={true} onPress={()=>{navigation.navigate('ScreenAdminClientMenu', {clientData, userKey})}} />
                {loading && <ComponentAdminLoadingIndicator /> }
                  <View style={styles.container}>
                      <ComponentAdminTitle title={'CREATE CODE'}  />
                      {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                      <View style={styles.form}>
                      <Text style={styles.subTitle}>ENTER NEW CODE</Text>
                        <ComponentAdminCodeEntry codeValue={codeValue} setCodeValue={setCodeValue} />
                        <ComponentAppBtnPrimary label={'CREATE CODE'} onPress={() => {submitForm()}} />
                      </View>
                  </View>
            </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      form: {
        width:'100%',
        paddingHorizontal: 32,
        paddingVertical: 16, 
      },
      subTitle: {
        fontFamily: 'primary-medium',
        fontSize: 16,
        color: colors.slate,
        width:'100%',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 16,
        marginTop:8
      }

})

export default ScreenAdminClientCreateCode
