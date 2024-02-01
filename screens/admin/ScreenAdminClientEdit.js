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
    const { userKey, title } = route.params
    //local variables
    const formRef = useRef()
    const firstFormFieldRef = useRef()
    //local state
    const [groups, setGroups] = useState({})
    const [groupsComponentArray, setGroupsComponentArray] = useState([])
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
      active:true,
      deleted: false,
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
    useEffect(() =>{
      fetchGroups = async () => {
          try{
            const collectionRef = collection(db, "groups")
            const orderByRef = orderBy("order", "asc")
            const queryRef = query(collectionRef, orderByRef, limit(ConfigApp.GroupLimit))
            const querySnapshot = await getDocs(queryRef)
            let tempGroupObj = {}
          
            if(querySnapshot){
              querySnapshot.forEach((doc) =>{
                const groupData = doc.data()
                tempGroupObj[doc.id] = {
                  selected: formValues.groups.includes(doc.id) ? true : false,
                  order: groupData.order,
                  title: groupData.title,
                  active: groupData.active
                }
              })

              const groupKeys = Object.keys(tempGroupObj)
              const groupsComponentTempArray = groupKeys.map((key) => {
                return (
                  <View key={key + '1'}>
                  <ComponentAdminSelectButton key={key} label={tempGroupObj[key].title} selected={tempGroupObj[key].selected} onPress={() => {updateGroupSelected(key)}} />
                  <ComponentAppSpacerView key={key + '2'} height={16} />
                  </View>
                )
              })
              setGroups(prevState => tempGroupObj)
              setGroupsComponentArray(prevState => groupsComponentTempArray)

            }else{
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Error fetcing groups', icon:'ios-warning'}})
              return
            }
          }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
          }
        }
        fetchGroups()
      }, [formValues.groups])
    

    useEffect(() => {
      //Fetch user document
      const fetchUserDoc = async (key) => {
        setLoading(true)
          try{
            const response = await UtilsFirestore.getDocumentByKey({currentCollection:'users', key: key})
            if(!response.error){
              //return data
              setFormValues(prevState => response)
            }else{
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:response.error, icon:'ios-warning'}})
              return
            }
          }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
          }
        setLoading(false)
      }
      fetchUserDoc(userKey)
    },[])

    useEffect(()=> {
      const setGroupComponents = async () => {
        const groupKeys = Object.keys(groups)
        const groupsComponentTempArray = await Promise.all(groupKeys.map( async (key) => {
          return (
            <View key={key + '1'}>
              <ComponentAdminSelectButton key={key} label={groups[key].title} selected={groups[key].selected} onPress={() => {updateGroupSelected(key)}} />
              <ComponentAppSpacerView key={key + '2'} height={16} />
            </View>
          )
        }))
        setGroupsComponentArray(prevState => groupsComponentTempArray)
      }
      setGroupComponents()
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
        //Update formValues with code and groups ready for submit
        const selectedGroups = Object.keys(groups).filter(key => groups[key].selected)
        //Form values for submit
        const formValuesForSubmit = ({
          ...formValues,
          groups: selectedGroups,
        })
        //Try to add client to Firestore
        try{
          setLoading(true)
          const response = await UtilsFirestore.setDocument({currentCollection: 'users', data: formValuesForSubmit, key: userKey})
          console.log(response)
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
        //scroll the form to top on completion
        UtilsHelpers.scrollToTop({animated: true, ref: formRef})
        //Set focus to first form field
        setLoading(false)
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Client updated', icon:'ios-checkmark'}})
        return
    }

    //Update the delete status of the client
    const updateDeleteStatusOfClient = async () => {
      console.log('I should be deleting')
      try{
        setLoading(true)
        const response = await UtilsFirestore.updateDocumentByKey({currentCollection: 'users', key: userKey, data:{isDeleted: true}})
        if(!response.error){
          setLoading(false)
          navigation.navigate('ScreenAdminClientManagement', {message: 'Client has been deleted'})
        }else{
          console.log(response.error)
          setLoading(false)
          return
        }
      }catch(error){
        console.log(error.message)
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
        <ComponentAdminHeader backButton={true} onPress={() => {navigation.navigate('ScreenAdminClientMenu', {title, userKey})}} />
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
                    <Text style={styles.subTitle}>ACCOUNT STATUS</Text>
                    <ComponentAdminToggle title={'ACTIVE'} selectedValue={formValues.active} setterFunction={() => {setFormValues({...formValues, active: !formValues.active})}} />
                    <ComponentAppSpacerView height={24} />
                    <ComponentAppBtnPrimary label={'UPDATE CLIENT'} onPress={()=>{submitForm()}} icon={true} iconName={'create'} bgrColor={colors.slate} />
                    <ComponentAppSpacerView height={16} />
                    <ComponentAppBtnPrimary label={'DELETE CLIENT'} onPress={()=>{deleteClient()}}  icon={true} iconName={'trash-outline'} />
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