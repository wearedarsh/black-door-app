import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
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
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAppSpacerView from '../../components/componentAppSpacerView'
import ComponentAdminSelectButton from '../../components/admin/componentAdminSelectButton'
import ComponentAdminToggle from '../../components/admin/componentAdminToggle'
import ComponentAdminDateInput from '../../components/admin/componentAdminDateInput'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, getDocs, onSnapshot, where, orderBy, query, limit } from "firebase/firestore"
//config
import ConfigApp from '../../config/configApp'
//styles
import { colors } from '../../assets/style/theme'


const ScreenAdminPropertyAdd = ({route, navigation}) => {
    const formRef = useRef()
    //local state
    const [groups, setGroups] = useState({})
    const [groupsComponentArray, setGroupsComponentArray] = useState([])
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    //firestore
    const db = getFirestore(app)
    //initialise form values
    const today = new Date()
    const [formValues, setFormValues] = useState({
      title: '',
      location: '',
      price: '',
      secondaryPrice: '',
      shortDescription: '',
      heroImageURL:'',
      squareFeet:'',
      bedrooms: '',
      bathrooms: '',
      groups: [],
      long: '',
      lat: '',
      isActive: false,
      isDeleted: false,
      isSold: false,
      isUnderOffer: false,
      listedAt: '',
      listedAtDD: today.getDate().toString(),
      listedAtMM: today.getMonth().toString(),
      listedAtYY: today.getFullYear().toString()
    })
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
                  selected: false,
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
              console.log('couldnt get groups')
              setLoading(false)
              UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Error fetcing groups', icon:'ios-warning'}})
              return
            }
          }catch(error){
            console.log(error.message)
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
            return
          }
        }
        fetchGroups()
      }, [formValues.groups])

      //render groups component
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

      //form submit
    const formSubmit = async () => {
      
    
      //check inputs are populated
      if(!UtilsValidation.inputsPopulated({data: {
        title: formValues.title,
        location: formValues.lastName,
        price: formValues.emailAddress,
        shortDescription: formValues.mobileNumber,
        size: formValues.size,
        heroImageURL: formValues.heroImageURL,
        dd: formValues.listedAtDD,
        mm: formValues.listedAtMM,
        yy: formValues.listedAtYY,
        long: formValues.long,
        lat: formValues.lat,
        bedrooms: formValues.bedrooms,
        bathrooms: formValues.bathrooms
      }})){
        setLoading(false)
        UtilsHelpers.scrollToTop({ref: formRef, animated: true})
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please complete all fields', icon:'ios-warning'}})
        return
      }
      
      //convert date string to date
      const convertedDate = await UtilsHelpers.stringToDate({day:formValues.listedAtDD, month:formValues.listedAtMM, year:formValues.listedAtYY})
      //check date is a number and is valid
      const isDate = UtilsHelpers.isValidDate({date:convertedDate})
      if(!isDate){
        setLoading(false)
        UtilsHelpers.scrollToTop({ref: formRef, animated: true})
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:'Please enter a valid date', icon:'ios-warning'}})
        return
      }
      //convert date to timestamp for firestore
      const firestoreTimeStamp = await UtilsFirestore.convertDateToFirestoreTimestamp({date: convertedDate})

      setLoading(true)
      //Update formValues with code and groups ready for submit
      const selectedGroups = Object.keys(groups).filter(key => groups[key].selected)
      //Form values for submit
      const formValuesForSubmit = ({
        ...formValues,
        groups: selectedGroups,
        listedAt: firestoreTimeStamp,
      })
      //remove the seperate date values
      const { listedAtDD, listedAtMM, listedAtYY, ...cleanedFormValues } = formValuesForSubmit
      //try to add to firestore
      try{
        const response = await UtilsFirestore.addDocument({currentCollection: 'properties', data: cleanedFormValues})
        if(response.error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          return
        }else{
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:'Property added successfully', icon: 'checkmark'}, setterFunc: setFeedback})
          UtilsHelpers.scrollToTop({ref: formRef, animated: true})
        }
      }catch(error){
          setLoading(false)
          UtilsValidation.showHideFeedback({duration: 3000, data: {title:error.message, icon: 'ios-warning'}, setterFunc: setFeedback})
          UtilsHelpers.scrollToTop({ref: formRef, animated: true})
          return
      }
      //clear form values
      await UtilsHelpers.clearFormValuesObject({setFunction: setFormValues, object: formValues})
      //scroll to top
      UtilsHelpers.scrollToTop({ref: formRef, animated: true})
      //reset groups
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
      resetGroupsSelected()
      
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
                <ComponentAdminTitle title={'PROPERTY ADD'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} /> }
            </View>
                {formValues && 
                <ScrollView style={styles.form} ref={formRef}>
                  
                  <ComponentAppSpacerView height={16} />
                  <ComponentAdminInput placeholder={'Enter title...'} label={'TITLE'} value={formValues.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'LOCATION'} value={formValues.location} onChangeText={newValue => updateFormFields(newValue, 'location')}/>
                  <ComponentAdminInput placeholder={'Enter price..'} label={'PRICE'} value={formValues.price} onChangeText={newValue => updateFormFields(newValue, 'price')} />
                  <ComponentAdminInput placeholder={'Enter description..'} label={'DESCRIPTION'} multiline={true} numberoflines={7} height= {240} value={formValues.shortDescription} onChangeText={newValue => updateFormFields(newValue, 'shortDescription')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'SIZE'} value={formValues.squareFeet} onChangeText={newValue => updateFormFields(newValue, 'squareFeet')} />
                  <ComponentAdminInput placeholder={'Enter image URL..'} label={'IMAGE URL'} value={formValues.heroImageURL} onChangeText={newValue => updateFormFields(newValue, 'heroImageURL')} />
                  <Text style={styles.subTitle}>MARKETING GROUPS</Text>
                    {groupsComponentArray && groupsComponentArray}
                    <Text style={styles.subTitle}>LISTING DATE</Text>
                    <ComponentAdminDateInput onChangeTextDD={newValue => updateFormFields(newValue, 'listedAtDD')} onChangeTextMM={newValue => updateFormFields(newValue, 'listedAtMM')} onChangeTextYY={newValue => updateFormFields(newValue, 'listedAtYY')} valueDD={formValues.listedAtDD} valueMM={formValues.listedAtMM} valueYY={formValues.listedAtYY} />
                    <Text style={styles.subTitle}>PROPERTY STATUS</Text>
                    <ComponentAdminToggle title={'SOLD'} selectedValue={formValues.isSold} setterFunction={() => {setFormValues({...formValues, isSold: !formValues.isSold})}} />
                    <ComponentAppSpacerView height={16} />
                    <ComponentAdminToggle title={'UNDER OFFER'} selectedValue={formValues.isUnderOffer} setterFunction={() => {setFormValues({...formValues, isUnderOffer: !formValues.isUnderOffer})}} />
                    <ComponentAppSpacerView height={16} />
                    <ComponentAdminToggle title={'ACTIVE'} selectedValue={formValues.isActive} setterFunction={() => {setFormValues({...formValues, isActive: !formValues.isActive})}} />
                    <ComponentAppSpacerView height={24} />
                  <ComponentAppBtnPrimary label={'ADD PROPERTY'} onPress={() => {formSubmit()}} />
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

export default ScreenAdminPropertyAdd;