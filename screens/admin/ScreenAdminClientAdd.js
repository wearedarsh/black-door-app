import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsValidation from '../../utils/utilsValidation'
import UtilsEncryption from '../../utils/utilsEncryption'
import UtilsCodeManagement from '../../utils/utilsCodeManagement'
import UtilsEmail from '../../utils/utilsEmail'
import UtilsHelpers from '../../utils/utilsHelpers'
//config
import ConfigApp from '../../config/configApp'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAdminToggle from '../../components/admin/componentAdminToggle'
import ComponentAppSpacerView from '../../components/componentAppSpacerView'
import ComponentAdminSelectButton from '../../components/admin/componentAdminSelectButton'
import ComponentAdminCodeEntry from '../../components/admin/componentAdminCodeEntry'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, orderBy, limit, query, getDocs } from "firebase/firestore"
//styles
import { colors } from '../../assets/style/theme'
import { setGroups } from '../../redux/actions/actionGroups'

const ScreenAdminClientAdd = ({navigation}) => {
    //local state
    const [groups, setGroups] = useState(false)
    const [groupsComponentArray, setGroupsComponentArray] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    //initialise form fields
    const [formValues, setFormValues] = useState({
      firstName: 'Porky',
      lastName: 'Windsford',
      emailAddress: 'porky@wearedarsh.com',
      mobileNumber: '07812036791',
      status: 1,
      groups:[],
      emailOptIn: true,
      pushOptIn: true,
    })
  //initialise code
  const [codeValue, setCodeValue] = useState('')
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, "groups")
    const orderByRef = orderBy("order", "asc")
    const queryRef = query(collectionRef, orderByRef, limit(ConfigApp.GroupLimit))
    //local variables 
    const formRef = useRef()
    const firstFormFieldRef = useRef()
    let userKey
    //update groups selected value
    const updateGroupSelected = (key) => {
      setGroups(prevState => ({
        ...prevState,
        [key] : {
          ...prevState[key],
          selected: !prevState[key].selected
        }
      }))
    }
    //fetch groups
    useEffect(() => {
      const fetchGroups = async () => {
        try{
          const groupsSnapshot = await getDocs(queryRef)
          if(groupsSnapshot){
            let groupsTempObject = {}
            let groupsTempComponentArray = []
            //grab documents and add object to local state
            groupsSnapshot.forEach((doc) =>{
              const data = doc.data()
              groupsTempObject[doc.id] = {
                active: data.active,
                order: data.order,
                title: data.title,
                selected: false
              }
            })
            //update local state
            setGroups(groupsTempObject)
          }
        }catch(error){
          console.log(error)
        }
      }
      fetchGroups()
    },[])
    //set groups components
    useEffect(() => {
      //create array of components for rendering
      const groupKeys = Object.keys(groups)
      const groupsComponentTempArray = groupKeys.map((key) => {
      return (
        <View key={key + '2'}>
          <ComponentAdminSelectButton key={key} label={groups[key].title} selected={groups[key].selected} onPress={() => {updateGroupSelected(key)}} />
          <ComponentAppSpacerView key={key + '1'} height={16} />
        </View>
      )
      })
      //update local state
      setGroupsComponentArray(groupsComponentTempArray)
    }, [groups])
    //form fields
    const updateFormFields = (string, key) => {
        setFormValues(prevState => ({
          ...prevState,
          [key]: string
        }))
    }
    //submit form
    const submitForm = async () => {
        setLoading(true)
        //check inputs are populated
        if(!UtilsValidation.inputsPopulated({data: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          emailAddress: formValues.emailAddress,
          mobileNumber: formValues.mobileNumber,
          code: codeValue
        }})){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please complete all fields', icon:'ios-warning'}})
          return
        }
        //check email address correct format
        if(!UtilsValidation.isEmail({email: formValues.emailAddress})){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'Please enter a valid email address', icon:'ios-warning'}})
          return
        }
        //check if code exists in code management
        try{
          const codeExists = await UtilsCodeManagement.checkCodeExists({code: codeValue})
          if(codeExists.exists){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:'This code is already in use', icon:'ios-warning'}})
            return
          }
          if(codeExists.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:codeExists.error, icon:'ios-warning'}})
            return
          }
        }catch(error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title: error.message, icon:'ios-warning'}})
          return
        }
        //Update formValues with code and groups ready for submit
        const selectedGroups = Object.keys(groups).filter(key => groups[key].selected)
        //encrypt code for inserting
        const encryptedCode = UtilsEncryption.encrypt(codeValue)
        const formValuesForSubmit = ({
          ...formValues,
          groups: selectedGroups,
          code: encryptedCode
        })
        //try to add client to firestore
        try{
          setLoading(true)
          const response = await UtilsFirestore.addDocument({currentCollection: 'clients', data: formValuesForSubmit})
          if(response.error){
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
              return
          }else{
            //get user document key to add to the code config file
            userKey = response.key
          }
        }catch(error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
          return
        }
        //add code to config file
        try{
          setLoading(true)
          const response = await UtilsCodeManagement.addCodeToConfig({ encryptedCode:encryptedCode, userKey: userKey})
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
        const sendInviteEmailToCustomer = async () => {
          setLoading(true)
          try{
            const response = await UtilsEmail.sendSingleTemplateEmail({
              emailSubjectTemplate: 'invite', 
              emailContentTemplate: 'invite',
              fromEmailNameTemplate: 'adminStandard',
              fromEmail: 'adminStandard',
              recipient: formValues.emailAddress,
              mergeFieldsArray: [
                {field: '%firstName%', 
                value: formValues.firstName}, 
                {field: '%inviteCode%', 
                value: codeValue}]
            })
            if(!response.error){
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Client added and invite email sent', icon:'ios-checkmark'}})
              return
            }
          }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
          }
        }
        const sendEmailToClient = async () => {
          Alert.alert('Client Added', 'Would you like to send an email notification?', [
            {
              text: 'No',
              style: 'cancel',
              onPress: () => {
                setLoading(false)
                UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Client added', icon:'ios-checkmark'}})
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
        const resetGroupsSelected = () => {
          const keys = Object.keys(groups).filter(key => groups[key].selected)
          for(let key of keys){
            setGroups(prevState => ({
              ...prevState,
              [key] : {
                ...prevState[key],
                  selected : false
                }
            }))
          }
        }
        //ask user if they would like to notify user
        setLoading(true)
        await sendEmailToClient()
        //clear the form fields
        await UtilsHelpers.clearFormValuesObject({setFunction: setFormValues, object: formValues})
        //reset the code field value
        setCodeValue('')
        //reset all group components selected to false
        await resetGroupsSelected()
        //scroll the form to top on completion
        UtilsHelpers.scrollToTop({animated: true, ref: formRef})
        //Set focus to first form field
        UtilsHelpers.nextFormFocus({ref: firstFormFieldRef})
        setLoading(false)
    }
    return (
      <>
        <ComponentAdminHeader backButton={true} onPress={() => {navigation.navigate('ScreenAdminClientManagement')}} />
        {loading && <ComponentAdminLoadingIndicator />}
            <View style={styles.container}>
                <ComponentAdminTitle title={'ADD CLIENT'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} />}
                  <ScrollView style={styles.form} ref={formRef}>
                    <Text style={styles.subTitle}>PERSONAL DETAILS</Text>
                    <ComponentAdminInput placeholder={'Enter first name...'} label={'FIRST NAME'} value={formValues.firstName} onChangeText={newValue => updateFormFields(newValue, 'firstName')} inputRef={firstFormFieldRef} />
                    <ComponentAdminInput placeholder={'Enter last name...'} label={'LAST NAME'} value={formValues.lastName} onChangeText={newValue => updateFormFields(newValue, 'lastName')} />
                    <ComponentAdminInput placeholder={'Enter email address...'} label={'EMAIL ADDRESS'} value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                    <ComponentAdminInput placeholder={'Enter mobile number...'} label={'MOBILE NUMBER'} value={formValues.mobileNumber} onChangeText={newValue => updateFormFields(newValue, 'mobileNumber')} />
                    <Text style={styles.subTitle}>MARKETING</Text>
                    <ComponentAdminToggle title={'EMAIL OPT IN'} selectedValue={formValues.emailOptIn} setterFunction={() => {setFormValues({...formValues, emailOptIn: !formValues.emailOptIn})}} />
                    <ComponentAppSpacerView height={8} />
                    <ComponentAdminToggle title={'PUSH OPT IN'} selectedValue={formValues.pushOptIn} setterFunction={() => {setFormValues({...formValues, pushOptIn: !formValues.pushOptIn})}} />
                    <ComponentAppSpacerView height={8} />
                    <Text style={styles.subTitle}>MARKETING GROUPS</Text>
                    {groupsComponentArray && groupsComponentArray}
                    <Text style={styles.subTitle}>INVITE CODE</Text>
                    <ComponentAdminCodeEntry codeValue={codeValue} setCodeValue={setCodeValue} />
                    <ComponentAppBtnPrimary label={'ADD CLIENT'} onPress={()=>{submitForm()}} />
                    <ComponentAppSpacerView height={120} />
                  </ScrollView>
            </View>
      </>
  );
};

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

export default ScreenAdminClientAdd