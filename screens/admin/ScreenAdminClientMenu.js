import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
//navigation
import { useFocusEffect } from '@react-navigation/native'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminParagraph from '../../components/admin/componentAdminParagraph'
import ComponentAdminInformation from '../../components/admin/componentAdminInformation'
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
        const { data, key } = route.params
        const { firstName, lastName } = data
        //local state
        const [loading, setLoading] = useState(false)
        const [feedback, setFeedback] = useState(false)
        const [hasSignedUp, setHasSignedUp] = useState(false)
        const [userLiveCode, setUserLiveCode] = useState(false)
        const [liveCodeKey, setLiveCodeKey] = useState('')
        const [clientDetails, setClientDetails] = useState({firstName, lastName})
        const [codeExpiryDate, setCodeExpiryDate]  = useState('')
        
        useFocusEffect(
          React.useCallback(()=>{
            setLoading(true)
            //check if user has signed up
            try{
                const fetchUserDoc = async () => {
                    const response = await UtilsFirestore.getDocumentByKey({currentCollection: 'users', key})
                    if(!response.error){
                        //check to see if the users account
                        const { isActive } = response
                        if(isActive){
                          setHasSignedUp(true)
                        }else{
                          //check if user has a live code
                          const firestoreTimeStamp = await UtilsFirestore.convertDateToFirestoreTimestamp({date: new Date()})
                          const response = await UtilsCodeManagement.checkLiveCodeForUser({currentCollection: 'inviteCodes', userId: key, firestoreTimeStamp})
                          if(!response.error){
                            const { expiresAt } = response.data
                            const dateObject = expiresAt.toDate()
                            const friendlyDateString = UtilsHelpers.localeDateString({dateObject, locale:'en-UK', options: {day: "numeric", month:"short", hour: "numeric", minute: "numeric"}})
                            setUserLiveCode(true)
                            setCodeExpiryDate(friendlyDateString)
                            setLiveCodeKey(response.codeKey)
                            setClientDetails(prevState => ({firstName: response.firstName, lastName: response.lastName}))
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
        },[]))

        //Update the delete status of the client
    const updateDeleteStatusOfClient = async () => {
      try{
        setLoading(true)
        const response = await UtilsFirestore.updateDocumentByKey({currentCollection: 'users', key, data:{isDeleted: true}})
        if(!response.error){
          setLoading(false)
          navigation.navigate('ScreenAdminClientManagement', {message: 'Client has been deleted'})
        }else{
          UtilsValidation.showHideFeedback({icon:'ios-warning', title: response.error, duration:3000, setterFunc: setFeedback})
          return
          setLoading(false)
          return
        }
      }catch(error){
        UtilsValidation.showHideFeedback({icon:'ios-warning', title: error.message, duration:3000, setterFunc: setFeedback})
        setLoading(false)
        return
      }
    }
    //delete client alert functionality
    const deleteClient = async () => {
      Alert.alert('Delete client', 'Are you sure you want to delete this user?', [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes', 
          onPress: () => {
            updateDeleteStatusOfClient()
            setLoading(false)
          }
        },
      ])
    }

        return (
            <>
              <ComponentAdminHeader backButton={true} onPress={()=>{navigation.navigate('ScreenAdminClientManagement')}} />
                {loading && <ComponentAdminLoadingIndicator /> }
                  <View style={styles.container}>
                      <ComponentAdminTitle title={'MANAGE CLIENT'}  />
                      {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                      <View style={styles.form}>
                      <Text style={styles.subTitle}>{firstName.toUpperCase() + ' ' + lastName.toUpperCase()}</Text>
                      {!hasSignedUp ? userLiveCode && codeExpiryDate ?  <ComponentAdminInformation information={'This clients invite code expires on ' + codeExpiryDate} /> : <ComponentAdminInformation information={'This clients invite code has expired'} /> : null}
                        {!hasSignedUp ? <ComponentAppBtnPrimary label={'CREATE NEW CODE'} onPress={() => {navigation.navigate('ScreenAdminClientCreateCode', {data, key, codeKey: liveCodeKey})}} /> : <ComponentAdminInformation information={'This account is live'} />  }
                        
                        <ComponentAppBtnPrimary label={'EDIT CLIENT'} onPress={() => {navigation.navigate('ScreenAdminClientEdit', {key, data})}} />

                        <ComponentAppBtnSecondary label={'DELETE CLIENT'} onPress={()=>{deleteClient()}}  icon={true} iconName={'trash-outline'}  />
                        
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
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  
    
  });

export default ScreenAdminClientMenu
