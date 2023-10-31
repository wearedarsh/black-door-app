import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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


const ScreenAdminMarketingGroupEdit = ({route, navigation}) => {
    //local state
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    const { key } = route.params
    const [formFields, setFormFields] = useState({
      title: '',
      order: '',
      active: ''
    })
    //fetch
    useEffect(() => {
        const fetchClient = async () => {
          setLoading(true)
          const response = await UtilsFirestore.getDocumentByKey({currentCollection: 'groups', key: key})
          if(response.error){ 
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          }else{
            setFormFields({
              title: response.title,
              order: response.order,
              active: response.active
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
        const response = await UtilsFirestore.setDocument({currentCollection: 'groups', data: formFields, key: key})
        if(response.error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
        }else{
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:'Group updated successfully', icon: 'checkmark'}, setterFunc: setFeedback})
        }
    }

    return (
      <>
        <ComponentAdminHeader backButton={true} onPress={()=> {navigation.navigate('ScreenAdminMarketingGroupManagement')}} />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminTitle title={'GROUP EDIT'} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} /> }
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter first name...'} label={'TITLE ORANGO'} value={formFields.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />

                  
                  <ComponentAppBtnPrimary label={'EDIT GROUP'} onPress={() => {submitForm()}} />
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

export default ScreenAdminMarketingGroupEdit