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
import UtilsFirestore from '../../utils/utilsFirestore'

const ScreenAdminMarketingNotificationTest = ({navigation}) => {
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [formValues, setFormValues ] = useState({
        title: 'BLKDR APP',
        subtitle: 'Exclusive access',
        body: '£300M NYC Penthouse, click to view'
    })
    //update form fields on entry
    const updateFormFields = (string, key) => {
        setFormValues(prevState => ({
          ...prevState,
          [key]: string
        }))
    }

    const appBranding = {
      headline: 'BLKDR',
      strapline: 'VIP',
      straplineAdmin: 'ADMIN',
      websiteDomain: 'https://blkdr.co.uk',
      assetDomain: 'https://blkdr.co.uk',
      homeStrapline: 'EXCLUSIVE ACCESS TO SUPER PRIME PROPERTY',
      emailFooterStrapline: 'Sent from the BLKDR vip app.',
      emailTrackingURL: 'https://blkdr.co.uk/et.php',
      signupButtonLabel: 'VIP ACCESS',
      loginButtonLabel: 'LOG IN',
      iosAppDownloadUrl: 'https://iosAppDownloadURLInTheme.js',
      androidAppUrl: 'https://androidAppDownloadURL.js',
      copyrightStrapline: '© Copyright BLKDR',
      colors: {
          primary: {
            main: '#AF9A63', // main primary color
            dark: '#7F6E49', // darker shade of primary
            light: '#E0D0A7', // lighter shade of primary
          },
          secondary: {
            main: '#231F20', // main secondary color
            dark: '#1A1718', // darker shade of secondary
            light: '#555555', // lighter shade of secondary
          },
          background: {
            main: '#FFFFFF', // main background color
            dark: '#F0F0F0', // darker background shade
            light: '#FFFFFF', // lighter background shade
          },
          text: {
            primary: '#333333', // main text color
            secondary: '#777777', // secondary text color
            light: '#FFFFFF', // text color on light background
            dark: '#000000', // text color on dark background
          },
          primary: '#AF9A63',//primary
          secondary: '#231F20',//secondary
          secondaryMedium: '#343232', //secondary-medium
          secondaryLight: '#999999', //secondary-light
          white: '#ffffff', //white
          offWhite: '#fefefe' //used for gmail links
      },
      homeScreenLogoImage: {
          url: 'https://www.blkdr.co.uk/assets/img/app-home-logo@2x.png',
          style: {marginTop: '20px', width: '240px'}
      },
      homeScreenBgrImage: {
          url: 'https://www.blkdr.co.uk/assets/img/app-home-bgr@2x.png',
          style: {backgroundSize: 'cover'}
      },
      headerLogoImage: {
          url: 'https://www.blkdr.co.uk/assets/img/app-header-logo@2x.png',
          style: {padding: 0, width: '120px'}
      }
  }

    const addAppBrandingToFirestore = async () => {
      try{
        const response = UtilsFirestore.updateDocumentByKey({currentCollection: 'clients/blkdr/vipapp/branding', key: 'blkdrdemo', data: {app: appBranding}})
      }catch(error){
        console.log(error.message)
      }
    }


      

    const sendNotification = async () => {
        try{
            const response = await UtilsPushNotification.sendPushNotification({expoPushToken:'ExponentPushToken[mDJrEnCWt9HumlUFq6lYor]', title: formValues.title, subtitle: formValues.subtitle, body: formValues.body, data: {screen: "ScreenAppPropertyView", key: '2o6kcd8hSJl0Xzeudcnd'}, categoryId: 'propertyListing'})
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
                <ComponentAdminTitle title={'MARKETING TEST'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} />}
                <View style={styles.form}>
                    <ComponentAdminInput placeholder={'Enter title...'} label={'TITLE'} value={formValues.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />
                    <ComponentAdminInput placeholder={'Enter title...'} label={'SUBTITLE'} value={formValues.subtitle} onChangeText={newValue => updateFormFields(newValue, 'subtitle')} />
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