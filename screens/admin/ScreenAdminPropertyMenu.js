import React, { useState, useEffect, useCallback } from 'react'
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
import UtilsValidation from '../../utils/utilsValidation'
//styles
import { colors } from '../../assets/style/theme.js'
//icons
import { Ionicons } from '@expo/vector-icons'

const ScreenAdminPropertyMenu = ({route, navigation}) => {
        //local variables
        const { data, key } = route.params
        const { title, location, isActive } = data
        //local state
        const [loading, setLoading] = useState(false)
        const [feedback, setFeedback] = useState(false)
        const [propertyDetails, setPropertyDetails] = useState({title, location, isActive})
        
        useFocusEffect(
          React.useCallback(()=>{
            setLoading(true)
            //check if user has signed up
            try{
                const fetchPropertyDoc = async () => {
                    const response = await UtilsFirestore.getDocumentByKey({currentCollection: 'properties', key})
                    if(!response.error){
                        //check to see if the users account
                        const { isActive, title, location } = response
                        setPropertyDetails(prevState => ({...prevState, title, isActive, location}))
                        setLoading(false)
                        return
                    }else{
                        setLoading(false)
                        UtilsValidation.showHideFeedback({icon:'ios-warning', title: response.error, duration:3000, setterFunc: setFeedback})
                        return
                    }
                }
                fetchPropertyDoc()
            }catch(error){
                setLoading(false)
                UtilsValidation.showHideFeedback({icon:'ios-warning', title: error.message, duration:3000, setterFunc: setFeedback})
                return
            }
        },[]))

        //Update the delete status of the client
    const updateDeleteStatusOfProperty = async () => {
      try{
        setLoading(true)
        const response = await UtilsFirestore.updateDocumentByKey({currentCollection: 'properties', key, data:{isDeleted: true}})
        if(!response.error){
          setLoading(false)
          navigation.navigate('ScreenAdminPropertyManagement', {message: 'Property has been deleted'})
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
    const deleteProperty = async () => {
        setLoading(true)
      Alert.alert('Delete property', 'Are you sure you want to delete this property?', [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes', 
          onPress: () => {
            updateDeleteStatusOfProperty()
            setLoading(false)
          }
        },
      ])
    }

        return (
            <>
              <ComponentAdminHeader backButton={true} onPress={()=>{navigation.navigate('ScreenAdminPropertyManagement')}} />
                {loading && <ComponentAdminLoadingIndicator /> }
                  <View style={styles.container}>
                      <ComponentAdminTitle title={'MANAGE PROPERTY'}  />
                      {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                      <View style={styles.form}>
                      <Text style={styles.subTitle}>{propertyDetails.title.toUpperCase() + ' - ' + propertyDetails.location.toUpperCase()}</Text>
                        <ComponentAppBtnPrimary label={'EDIT PROPERTY'} onPress={() => {navigation.navigate('ScreenAdminPropertyEdit', {key})}} />

                        <ComponentAppBtnSecondary label={'DELETE PROPERTY'} onPress={()=>{deleteProperty()}}  icon={true} iconName={'trash-outline'}  />
                        
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

export default ScreenAdminPropertyMenu
