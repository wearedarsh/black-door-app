import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
//utils
import UtilsPushNotification from '../../utils/utilsPushNotification'
import UtilsValidation from '../../utils/utilsValidation'

const ScreenAdminMarketingNotificationTest = ({navigation}) => {
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [formValues, setFormValues ] = useState({
        title: '',
        body: ''
    })
    //update form fields on entry
    const updateFormFields = (string, key) => {
        setFormValues(prevState => ({
          ...prevState,
          [key]: string
        }))
    }
    const sendNotification = async () => {
        try{
            const response = await UtilsPushNotification.sendPushNotification({expoPushToken:'ExponentPushToken[mDJrEnCWt9HumlUFq6lYor]', title: formValues.title, body: formValues.body, data: {screen: "ScreenAppPropertyView", id: '2o6kcd8hSJl0Xzeudcnd'}})
            if(response){
                UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:response.message, icon:'ios-checkmark'}})
                return
            }
        }catch(error){
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-checkmark'}})
            return
        }
    }
    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'MARKETING'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} />}
                <View style={styles.form}>
                    <ComponentAdminInput placeholder={'Enter title...'} label={'TITLE'} value={formValues.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />
                    <ComponentAdminInput placeholder={'Enter body...'} label={'BODY'} value={formValues.body} onChangeText={newValue => updateFormFields(newValue, 'body')} />
                    <ComponentAppBtnPrimary label={'UPDATE CLIENT'} onPress={()=>{sendNotification()}} icon={true} iconName={'create'} />
                </View>
            </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  form: {
    width:'100%',
    paddingHorizontal: 32,
    paddingVertical: 16, 
  } 
  
});

export default ScreenAdminMarketingNotificationTest