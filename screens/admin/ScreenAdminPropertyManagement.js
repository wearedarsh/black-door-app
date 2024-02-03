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


const ScreenAdminPropertyManagement = ({ navigation }) => {
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
    const orderTitleRef = orderBy("title", "desc")
    const queryRef = query(collectionRef, whereRef, orderActiveRef, orderTitleRef)
    //search filter
    const [filteredProperties, setFilteredProperties] = useState([])
    //search function
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = properties.filter((item) => item.docData.title.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredProperties(filteredArray)
    }
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
                <ComponentAdminTitle title={'PROPERTY MANAGEMENT'} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredProperties &&    
                  <FlatList style={{width:'100%'}}
                    data={filteredProperties}
                    renderItem={({ item }) => <ComponentAdminListItem icon={item.docData.isActive ? 'checkmark-circle' : null} title={item.docData.title.toUpperCase() + ' - ' + item.docData.location.toUpperCase()} onPress={() => {navigation.navigate('ScreenAdminPropertyEdit', {key:item.id})}} />}
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