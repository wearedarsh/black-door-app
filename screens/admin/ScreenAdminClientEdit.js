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
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary';
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

const ScreenAdminClientEdit = ({navigation, route}) => {
    //route params
    const { userKey } = route.params
    //local variables
    const formRef = useRef()
    const firstFormFieldRef = useRef()
    //local state
    const [groups, setGroups] = useState(false)
    const [groupsComponentArray, setGroupsComponentArray] = useState(false)
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    //initialise form fields
    const [formValues, setFormValues] = useState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: '',
      status: 1,
      groups:[],
      emailOptIn: true,
      pushOptIn: true,
      decryptedCode: '',
      code: ''
    })
    //initialise code
    const [codeValue, setCodeValue] = useState('')
    //firestore
    const db = getFirestore(app)
    
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
      //fetch groups function
      const fetchGroups = async () => {
        console.log('groups to check : ' + formValues.groups)
        //firestore config
        const collectionRef = collection(db, "groups")
        const orderByRef = orderBy("order", "asc")
        const queryRef = query(collectionRef, orderByRef, limit(ConfigApp.GroupLimit))
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
                selected: formValues.groups.includes(doc.id) ? true : false
              }
            })
            //update local state
            setGroups(groupsTempObject)
          }
        }catch(error){
          console.log(error)
        }
      }
      //fetch user doc function
      const fetchUserDoc = async (userKey) => {
          try{
            const userDoc = await UtilsFirestore.getDocumentByKey({currentCollection: 'users', key: userKey })
            if(userDoc.error){
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:userDoc.error, icon:'ios-warning'}})
              return
            }else{
              setLoading(false)
              //set form values
              const setForm = userDoc => {
                setFormValues({
                  firstName: userDoc.firstName,
                  lastName: userDoc.lastName,
                  emailAddress: userDoc.emailAddress,
                  mobileNumber: userDoc.mobileNumber,
                  status: userDoc.status,
                  groups: userDoc.groups,
                  emailOptIn: userDoc.emailOptIn,
                  pushOptIn: userDoc.pushOptIn,
                  code: userDoc.code,
                })
              }

              setForm(userDoc)
              
            
            console.log('formValues on first render: ' + JSON.stringify(formValues))
          }     
          }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 1500, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
          }
      }


      //fetch required data
      const fetchData = async () => {
        setLoading(true)
        //const groups = await fetchGroups()
        const userData = await fetchUserDoc(userKey)
        const groups = await fetchGroups()
        setLoading(false)
      }
      fetchData()
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
          //code: codeValue
        }})){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please complete all fields', icon:'ios-warning'}})
          return
        }
        //check email address correct format
        if(!UtilsValidation.isEmail({email: formValues.emailAddress})){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please enter a valid email address', icon:'ios-warning'}})
          return
        }
        //check if code exists in code management
        // try{
        //   const response = await UtilsCodeManagement.checkCodeExists({code: codeValue})
        //   if(response){
        //     setLoading(false)
        //     UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'This code is already in use, please choose another', icon:'ios-warning'}})
        //     return
        //   }
        // }catch(error){
        //   setLoading(false)
        //   UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title: error.message, icon:'ios-warning'}})
        // }
        
        //Update formValues with code and groups ready for submit
        const selectedGroups = Object.keys(groups).filter(key => groups[key].selected)
        console.log(JSON.stringify(selectedGroups))
        const formValuesForSubmit = ({
          ...formValues,
          groups: selectedGroups,
          code: UtilsEncryption.encrypt(codeValue)
        })
        return
        //try to add client to firestore
        try{
          setLoading(true)
          const response = await UtilsFirestore.addDocument({currentCollection: 'clients', data: formValuesForSubmit})
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
        //add code to config file
        try{
          setLoading(true)
          const response = UtilsCodeManagement.addCodeToConfig({ code:codeValue })
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
                <ComponentAdminTitle title={'EDIT CLIENT'} />
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

export default ScreenAdminClientEdit