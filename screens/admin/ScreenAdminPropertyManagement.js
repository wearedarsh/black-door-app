import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, onSnapshot, where, orderBy, query } from "firebase/firestore"
//utils
import UtilsValidation from '../../utils/utilsValidation'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminSearch from '../../components/admin/componentAdminSearch'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminListItem from '../../components/admin/componentAdminListItem'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminAddButton from '../../components/admin/componentAdminAddButton'


const ScreenAdminPropertyManagement = ({ navigation, route }) => {
    //local variables
    const { message = '' } = route?.params || {}
    //local state
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false) 
    const [properties, setProperties] = useState([])
    const [searchText, setSearchText] = useState('')
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, 'properties')
    const whereRef = where("isDeleted", "==", false)
    const orderActiveRef = orderBy("isActive", "desc")
    const orderTitleRef = orderBy("title", "asc")
    const queryRef = query(collectionRef, whereRef, orderActiveRef, orderTitleRef)
    //search filter
    const [filteredProperties, setFilteredProperties] = useState([])
    //search function
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = properties.filter((item) => item.docData.title.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredProperties(filteredArray)
    }
    //effect for if message is passed in route params
    useEffect(() => {
      if(message){
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:message, icon:'ios-warning'}})
      }
    },[message])
    //firestore listener
    useEffect(() => {
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
          setLoading(true)
          const propertiesArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            docData: doc.data()
          }))

          setProperties(propertiesArray)
          setLoading(false)
      }, (error) => {
        UtilsValidation.showHideFeedback({icon:'ios-warning', title: error.message, duration:3000, setterFunc: setFeedback})
      })

      //clean up function
      return () => {
        unsubscribe()
      }
    },[])
    //update filtered properties with properties if updated
    useEffect(() => {
      setFilteredProperties(properties)
    }, [properties])
    return (
      <>
        <ComponentAdminHeader />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminAddButton onPress={() => {navigation.navigate('ScreenAdminPropertyAdd')}} title={'ADD LISTING'} />
                <ComponentAdminTitle title={'LISTING MANAGEMENT'} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredProperties &&    
                  <FlatList style={{width:'100%'}}
                    data={filteredProperties}
                    renderItem={({ item }) => <ComponentAdminListItem title={item.docData.title.toUpperCase() + ' - ' + item.docData.location.toUpperCase()} subTitle={!item.docData.isActive ? 'INACTIVE' : 'LIVE'} onPress={() => {navigation.navigate('ScreenAdminPropertyMenu', {key:item.id, data: {title: item.docData.title, location: item.docData.location, isActive: item.docData.isActive}})}} />}
                    keyExtractor={(item) => item.id}
                    showVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  />
                }
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

export default ScreenAdminPropertyManagement;