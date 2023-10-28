import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsValidation from '../../utils/utilsValidation'
//config
import ConfigApp from '../../config/configApp'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary';
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAdminToggle from '../../components/admin/componentAdminToggle'
import ComponentAppSpacerView from '../../components/componentAppSpacerView'
import ComponentAdminSelectButton from '../../components/admin/componentAdminSelectButton'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, orderBy, limit, query, getDocs } from "firebase/firestore"
//styles
import { colors } from '../../assets/style/theme'
import { setGroups } from '../../redux/actions/actionGroups'

const ScreenAdminClientAdd = ({navigation}) => {
    //redux
    const dispatch = useDispatch()
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, "groups")
    const orderByRef = orderBy("order", "asc")
    const queryRef = query(collectionRef, orderByRef, limit(ConfigApp.GroupLimit))

    useEffect(() => {
      const fetchGroups = async () => {
        try{
          const groupsSnapshot = await getDocs(queryRef)
          if(groupsSnapshot){
            console.log(JSON.stringify(groupsSnapshot, null, 2))
            let groupsTempObject = {}
            groupsSnapshot.forEach((doc) =>{
              const data = doc.data()
              groupsTempObject[doc.id] = data
            })
            //dispatch(setGroups({data: groupsTempObject}))
          }

        }catch(error){
          console.log(error)
        }
      }

      fetchGroups()
      
    },[])


    


    //form fields
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        mobileNumber: '',
        approved: false,
        groups:[],
        emailOptIn: true,
        pushOptIn: true
    })
    //submit form
    const submitForm = async () => {
        setLoading(true)
        //check inputs are populated
       if(!UtilsValidation.inputsPopulated({data: {
          firstName: formValues.firstName,
          surName: formValues.lastName,
          emailAddress: formValues.emailAddress,
          mobileNumber: formValues.mobileNumber
        }})){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please complete all fields', icon:'ios-warning'}})
          return
        }
        //check email address correct format
        if(!UtilsValidation.isEmail){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please enter a valid email address', icon:'ios-warning'}})
          return
        }
        
        const response = UtilsFirestore.addDocument({currentCollection: 'clients', data: formValues})
        if(response.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
        }else{
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Client has been successfully added', icon:'checkmark'}})
        }  
    }
    return (
      <>
        <ComponentAdminHeader backButton={true} onPress={() => {navigation.navigate('ScreenAdminClientManagement')}} />
        {loading && <ComponentAdminLoadingIndicator />}
            <View style={styles.container}>
                <ComponentAdminTitle title={'ADD CLIENT'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} />}
                  <ScrollView style={styles.form}>
                    <Text style={styles.subTitle}>PERSONAL DETAILS</Text>
                    <ComponentAdminInput placeholder={'Enter first name...'} label={'FIRST NAME'} value={formValues.firstName} onChangeText={newValue => updateFormFields(newValue, 'firstName')} />
                    <ComponentAdminInput placeholder={'Enter last name...'} label={'LAST NAME'} value={formValues.lastName} onChangeText={newValue => updateFormFields(newValue, 'lastName')} />
                    <ComponentAdminInput placeholder={'Enter email address...'} label={'EMAIL ADDRESS'} value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                    <ComponentAdminInput placeholder={'Enter mobile number...'} label={'MOBILE NUMBER'} value={formValues.mobileNumber} onChangeText={newValue => updateFormFields(newValue, 'mobileNumber')} />
                    <Text style={styles.subTitle}>MARKETING</Text>
                    <ComponentAdminToggle title={'EMAIL OPT IN'} selectedValue={formValues.emailOptIn} setterFunction={() => {setFormValues({...formValues, emailOptIn: !formValues.emailOptIn})}} />
                    <ComponentAppSpacerView height={8} />
                    <ComponentAdminToggle title={'PUSH OPT IN'} selectedValue={formValues.pushOptIn} setterFunction={() => {setFormValues({...formValues, pushOptIn: !formValues.pushOptIn})}} />
                    <ComponentAppSpacerView height={8} />
                    <Text style={styles.subTitle}>MARKETING GROUPS</Text>
                    {groupsArray}
                    <ComponentAppBtnPrimary label={'ADD CLIENT'} onPress={()=>{testActionDispatch()}} />
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

export default ScreenAdminClientAdd