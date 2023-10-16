import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsValidation from '../../utils/utilsValidation';


const ScreenAdminClientEdit = ({route, navigation}) => {
    //local state
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    const { key } = route.params
    const [formFields, setFormFields] = useState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      approved: false
    })
    //fetch
    useEffect(() => {
        const fetchClient = async () => {
          setLoading(true)
          const response = await UtilsFirestore.getDocumentByKey({currentCollection: 'clients', key: key})
          if(response.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          }else{
            setFormFields({
              firstName: response.firstName,
              lastName: response.lastName,
              emailAddress: response.emailAddress,
              approved: response.approved
            })
            setLoading(false)
          }
        }
        fetchClient()
    },[])
    //update form fields
    const updateFormFields = (newValue, field) => {
      setFormFields({
        ...formFields,
        [field]: newValue
      })
    }
    //form submission
    const submitForm = async () => {
        setLoading(true)
        const response = await UtilsFirestore.setDocument({currentCollection: 'clients', data: formFields, key: key})
        if(response.error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
        }else{
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:'Client updated successfully', icon: 'checkmark'}, setterFunc: setFeedback})
        }
    }

    return (
      <>
        <ComponentAdminHeader backButton={true} onPress={()=> {navigation.navigate('ScreenAdminClientManagement')}} />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminTitle title={'CLIENT EDIT'} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} /> }
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter first name...'} label={'FIRST NAME'} value={formFields.firstName} onChangeText={newValue => updateFormFields(newValue, 'firstName')} />
                  <ComponentAdminInput placeholder={'Enter last name...'} label={'LAST NAME'} value={formFields.lastName} onChangeText={newValue => updateFormFields(newValue, 'lastName')} />
                  <ComponentAdminInput placeholder={'Enter email address...'} label={'EMAIL ADDRESS'} value={formFields.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                  
                  <ComponentAppBtnPrimary label={'EDIT CLIENT'} onPress={() => {submitForm()}} />
                </ScrollView>
            </View>
      </>
  );
};

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

export default ScreenAdminClientEdit