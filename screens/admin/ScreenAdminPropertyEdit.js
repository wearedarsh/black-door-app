import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsValidation from '../../utils/utilsValidation'
import UtilsHelpers from '../../utils/utilsHelpers'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator';
import ComponentAppSpacerView from '../../components/componentAppSpacerView';

const ScreenAdminPropertyEdit = ({route, navigation}) => {
    //initialise form values
    const [formValues, setFormValues] = useState({
      title: '',
      city: '',
      price: '',
      shortDescription: '',
      heroImage:'',
      squareFeet:''
    })

    const { key } = route.params
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    const formRef = useRef()

    //firestore document fetch
    useEffect(() => {
      const fetchProperty = async () => {
          setLoading(true)
          const propertyDoc = await UtilsFirestore.getDocumentByKey({currentCollection: 'properties', key: key})
          if(propertyDoc.error){
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:propertyDoc.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          }else{
            setFormValues({
              title:propertyDoc.title,
              city: propertyDoc.city,
              price: propertyDoc.price,
              shortDescription: propertyDoc.shortDescription,
              heroImage: propertyDoc.heroImage,
              squareFeet: propertyDoc.squareFeet
            })
            setLoading(false)
          }  
      }
      fetchProperty()
    },[])

    //form submit
    const formSubmit = async () => {
        setLoading(true)
        const response = UtilsFirestore.setDocument({currentCollection: 'properties', data: formValues, key})
        if(response.error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
        }else{
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:'Property updated successfully', icon: 'checkmark'}, setterFunc: setFeedback})
          UtilsHelpers.scrollToTop({ref: formRef, animated: true})
        }
    }
    //update form field values
    const updateFormFields = (newValue, field) => {
      setFormValues({
        ...formValues,
        [field]: newValue
      })
    }

    return (
      <>
        <ComponentAdminHeader backButton={true} onPress={()=> {navigation.navigate('ScreenAdminPropertyManagement')}} />
          
          {loading && <ComponentAdminLoadingIndicator />}
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY EDIT'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} /> }
            </View>
                {formValues && 
                <ScrollView style={styles.form} ref={formRef}>
                  
                  <ComponentAppSpacerView height={16} />
                  <ComponentAdminInput placeholder={'Enter title...'} label={'TITLE'} value={formValues.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'LOCATION'} value={formValues.city} onChangeText={newValue => updateFormFields(newValue, 'city')}/>
                  <ComponentAdminInput placeholder={'Enter location..'} label={'PRICE'} value={formValues.price} onChangeText={newValue => updateFormFields(newValue, 'price')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'DESCRIPTION'} multiline={true} numberoflines={7} height= {240} value={formValues.shortDescription} onChangeText={newValue => updateFormFields(newValue, 'shortDescription')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'SIZE'} value={formValues.squareFeet} onChangeText={newValue => updateFormFields(newValue, 'squareFeet')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'IMAGE URL'} value={formValues.heroImage} onChangeText={newValue => updateFormFields(newValue, 'heroImage')} />
                  <ComponentAppBtnPrimary label={'EDIT PROPERTY'} onPress={() => {formSubmit()}} />
                  <ComponentAppSpacerView height={32} />
                 </ScrollView>
                }
            
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  form: {
    width:'100%',
    paddingHorizontal: 32,
    paddingBottom:16
  },
  spacer: {
    height:16
  }

  
});

export default ScreenAdminPropertyEdit