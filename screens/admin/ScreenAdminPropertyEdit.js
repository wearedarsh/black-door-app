import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text} from 'react-native'
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

const ScreenAdminPropertyEdit = ({route, navigation}) => {
    //local variables
    const { key } = route.params
    const formRef = useRef()
    //local state
    const [groups, setGroups] = useState({})
    const [groupsComponentArray, setGroupsComponentArray] = useState([])
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    //firestore
    const db = getFirestore(app)
    //initialise form values
    const [formValues, setFormValues] = useState({
      title: '',
      location: '',
      price: '',
      secondaryPrice: '',
      shortDescription: '',
      longDescription: '',
      heroImageURL:'',
      squareFeet:'',
      bedrooms: '',
      bathrooms: '',
      floorplan: '',
      groups: [],
      long: '',
      lat: '',
      isActive: false,
      isDeleted: false,
      isSold: false,
      isUnderOffer: false,
      listedAt: '',
      listedAtDD: '',
      listedAtMM: '',
      listedAtYY: ''
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



    //firestore document fetch
    useEffect(() => {
      const fetchProperty = async () => {
          setLoading(true)
          const propertyDoc = await UtilsFirestore.getDocumentByKey({currentCollection: 'properties', key: key})
          if(propertyDoc.error){
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:propertyDoc.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          }else{
            //convert the date to string
            const listedAtDateObject = await UtilsFirestore.convertFirestoreTimestampToDateObject({date: propertyDoc.listedAt})
            const listedAtDateStrings = await UtilsHelpers.splitDateObjectToStrings({date: listedAtDateObject})
            setFormValues(prevState => ({
              ...formValues,
              title:propertyDoc.title,
              location: propertyDoc.location,
              price: propertyDoc.price,
              shortDescription: propertyDoc.shortDescription,
              longDescription: propertyDoc.longDescription,
              heroImageURL: propertyDoc.heroImageURL,
              squareFeet: propertyDoc.squareFeet,
              groups: propertyDoc.groups,
              isActive: propertyDoc.isActive,
              isDeleted: propertyDoc.isDeleted,
              isSold: propertyDoc.isSold,
              isUnderOffer: propertyDoc.isUnderOffer,
              long: propertyDoc.long,
              lat: propertyDoc.lat,
              bedrooms: propertyDoc.bedrooms,
              bathrooms: propertyDoc.bathrooms,
              floorplan: propertyDoc.floorplan,
              listedAt: propertyDoc.listedAt,
              listedAtDD: listedAtDateStrings.day,
              listedAtMM: listedAtDateStrings.month,
              listedAtYY: listedAtDateStrings.year,
            }))
            setLoading(false)
          }  
      }
      fetchProperty()
    },[])

    //form submit
    const formSubmit = async () => {
        //check inputs are populated
        if(!UtilsValidation.inputsPopulated({data: {
          title: formValues.title,
          location: formValues.lastName,
          price: formValues.emailAddress,
          shortDescription: formValues.shortDescription,
          longDescription: formValues.longDescription,
          size: formValues.size,
          heroImageURL: formValues.heroImageURL,
          floorplan: formValues.floorplan,
          dd: formValues.listedAtDD,
          mm: formValues.listedAtMM,
          yy: formValues.listedAtYY,
          long: formValues.long,
          lat: formValues.lat,
          bedrooms: formValues.bedrooms,
          bathrooms: formValues.bathrooms
        }})){
          setLoading(false)
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
          listedAt: firestoreTimeStamp
        })
        //remove the seperate date values
        const { listedAtDD, listedAtMM, listedAtYY, ...cleanedFormValues } = formValuesForSubmit

        try{
          const response = await UtilsFirestore.setDocument({currentCollection: 'properties', data: cleanedFormValues, key})
          if(response.error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:response.error, icon: 'ios-warning'}, setterFunc: setFeedback})
          }else{
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:'Property updated successfully', icon: 'checkmark'}, setterFunc: setFeedback})
            UtilsHelpers.scrollToTop({ref: formRef, animated: true})
          }
        }catch(error){
            setLoading(false)
            UtilsValidation.showHideFeedback({duration: 3000, data: {title:error.message, icon: 'ios-warning'}, setterFunc: setFeedback})
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
        <ComponentAdminHeader backButton={true} onPress={()=> {navigation.navigate('ScreenAdminPropertyMenu', {key, data: {title:formValues.title, location: formValues.location, isActive:formValues.isActive}} )}} />
          
          {loading && <ComponentAdminLoadingIndicator />}
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY EDIT'} />
                {feedback && <ComponentAdminFeedback title={feedback.title} icon={feedback.icon} /> }
            </View>
                {formValues && 
                <ScrollView style={styles.form} ref={formRef}>
                  
                  <ComponentAppSpacerView height={16} />
                  <ComponentAdminInput placeholder={'Enter title...'} label={'TITLE'} value={formValues.title} onChangeText={newValue => updateFormFields(newValue, 'title')} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'LOCATION'} value={formValues.location} onChangeText={newValue => updateFormFields(newValue, 'location')}/>
                  <ComponentAdminInput placeholder={'Enter price..'} label={'PRICE'} value={formValues.price} onChangeText={newValue => updateFormFields(newValue, 'price')} />
                  <ComponentAdminInput placeholder={'Enter short description..'} label={'SHORT DESCRIPTION'} multiline={true} numberoflines={7} height= {240} value={formValues.shortDescription} onChangeText={newValue => updateFormFields(newValue, 'shortDescription')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'SQUARE FEET'} value={formValues.squareFeet} onChangeText={newValue => updateFormFields(newValue, 'squareFeet')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'NUMBER OF BEDROOMS'} value={formValues.bedrooms} onChangeText={newValue => updateFormFields(newValue, 'bedrooms')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'NUMBER OF BATHROOMS'} value={formValues.bathrooms} onChangeText={newValue => updateFormFields(newValue, 'bathrooms')} />
                  <ComponentAdminInput placeholder={'Enter long description..'} label={'LONG DESCRIPTION'} multiline={true} numberoflines={7} height= {240} value={formValues.longDescription} onChangeText={newValue => updateFormFields(newValue, 'longDescription')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'LONG'} value={formValues.long} onChangeText={newValue => updateFormFields(newValue, 'long')} />
                  <ComponentAdminInput placeholder={'Enter size..'} label={'LAT'} value={formValues.lat} onChangeText={newValue => updateFormFields(newValue, 'lat')} />
                  <ComponentAdminInput placeholder={'Add Gallery..'} label={'IMAGE'} value={formValues.heroImageURL} onChangeText={newValue => updateFormFields(newValue, 'heroImage')} />
                  <ComponentAdminInput placeholder={'Add floorplan..'} label={'FLOORPLAN'} value={formValues.floorplan} onChangeText={newValue => updateFormFields(newValue, 'floorplan')} />
                  <Text style={styles.subTitle}>MARKETING GROUPS</Text>
                    {groupsComponentArray && groupsComponentArray}
                    <Text style={styles.subTitle}>LISTING DATE</Text>
                    <ComponentAdminDateInput onChangeTextDD={newValue => updateFormFields(newValue, 'listedAtDD')} onChangeTextMM={newValue => updateFormFields(newValue, 'listedAtMM')} onChangeTextYY={newValue => updateFormFields(newValue, 'listedAtYY')} valueDD={formValues.listedAtDD.toString()} valueMM={formValues.listedAtMM.toString()} valueYY={formValues.listedAtYY.toString()} />
                    <Text style={styles.subTitle}>PROPERTY STATUS</Text>
                    <ComponentAdminToggle title={'SOLD'} selectedValue={formValues.isSold} setterFunction={() => {setFormValues({...formValues, isSold: !formValues.isSold})}} />
                    <ComponentAppSpacerView height={16} />
                    <ComponentAdminToggle title={'UNDER OFFER'} selectedValue={formValues.isUnderOffer} setterFunction={() => {setFormValues({...formValues, isUnderOffer: !formValues.isUnderOffer})}} />
                    <ComponentAppSpacerView height={16} />
                    <ComponentAdminToggle title={'ACTIVE'} selectedValue={formValues.isActive} setterFunction={() => {setFormValues({...formValues, isActive: !formValues.isActive})}} />
                    <ComponentAppSpacerView height={24} />
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

export default ScreenAdminPropertyEdit