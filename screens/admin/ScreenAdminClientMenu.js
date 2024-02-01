import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsCodeManagement from '../../utils/utilsCodeManagement'
import UtilsHelpers from '../../utils/utilsHelpers'
//styles
import { colors } from '../../assets/style/theme.js'
//icons
import { Ionicons } from '@expo/vector-icons'

const ScreenAdminClientMenu = ({route, navigation}) => {
        //local variables
        const { title, userKey } = route.params
        //local state
        const [loading, setLoading] = useState(false)
        const [feedback, setFeedback] = useState(false)
        const [hasSignedUp, setHasSignedUp] = useState(false)
        const [userLiveCode, setUserLiveCode] = useState(false)
        const [codeExpiryDate, setCodeExpiryDate]  = useState('')
        
        useEffect(()=>{
            setLoading(true)
            //check if user has signed up
            try{
                const fetchUserDoc = async () => {
                    const response = await UtilsFirestore.getDocumentByKey({currentCollection: 'users', key: userKey})
                    if(!response.error){
                        //check to see if the users account
                        const { isActive } = response
                        if(isActive){
                          hasSignedUp = true
                        }else{
                          console.log('should be fetching the code now')
                          //check if user has a live code
                          const firestoreTimeStamp = await UtilsFirestore.convertDateToFirestoreTimestamp({date: new Date()})
                          const response = await UtilsCodeManagement.checkLiveCodeForUser({currentCollection: 'inviteCodes', userId: userKey, firestoreTimeStamp})
                          if(!response.error){
                            const { expiresAt } = response.data
                            const dateObject = expiresAt.toDate()
                            const friendlyDateString = UtilsHelpers.localeDateString({dateObject, locale:'en-UK', options: {day: "numeric", month:"short", hour: "numeric", minute: "numeric"}})
                            setUserLiveCode(true)
                            setCodeExpiryDate(friendlyDateString)
                          }
                        }
                        setLoading(false)
                        return
                    }else{
                        setLoading(false)
                        UtilsValidation.showHideFeedback({icon:'ios-warning', title: response.error, duration:3000, setterFunc: setFeedback})
                        return
                    }
                }
                fetchUserDoc()
            }catch(error){
                setLoading(false)
                UtilsValidation.showHideFeedback({icon:'ios-warning', title: error.message, duration:3000, setterFunc: setFeedback})
                return
            }
        },[])

        return (
            <>
              <ComponentAdminHeader backButton={true} onPress={()=>{navigation.navigate('ScreenAdminClientManagement')}} />
                {loading && <ComponentAdminLoadingIndicator /> }
                  <View style={styles.container}>
                      <ComponentAdminTitle title={'MANAGE CLIENT'}  />
                      {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                      <View style={styles.form}>
                      <Text style={styles.subTitle}>{title}</Text>
                      { userLiveCode && codeExpiryDate ?  <Text>This clients invite code expires on {codeExpiryDate} </Text> :  <Text>This clients invite code has expired </Text>}
                        {!hasSignedUp ? <ComponentAppBtnPrimary label={'CREATE NEW CODE'} onPress={() => {navigation.navigate('ScreenAdminMarketingGroupManagement')}} /> : <Text>This account is active</Text>  }
                        
                        <ComponentAppBtnPrimary label={'EDIT CLIENT'} onPress={() => {navigation.navigate('ScreenAdminClientEdit', {userKey, title})}} />
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
  
    
  });

export default ScreenAdminClientMenu
