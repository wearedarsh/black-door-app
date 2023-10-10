import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
//Firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, onSnapshot } from "firebase/firestore"
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminSearch from '../../components/admin/componentAdminSearch'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminListItem from '../../components/admin/componentAdminListItem'


const ScreenAdminPropertyManagement = ({ navigation }) => {
    //local state
    const feedback = false
    const [properties, setProperties] = useState([])
    const [searchText, setSearchText] = useState('')
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, 'properties')
    //search filter
    const [filteredProperties, setFilteredProperties] = useState([])
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = properties.filter((item) => item.docData.title.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredProperties(filteredArray)
    }
    //firestore listener
    useEffect(() => {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          const propertiesArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            docData: doc.data()
          }))
          setProperties(propertiesArray)
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
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY MANAGEMENT'} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon='warning' title={'Please complete all fields'} />}
                {filteredProperties &&    
                  <FlatList style={{width:'100%'}}
                    data={filteredProperties}
                    renderItem={({ item }) => <ComponentAdminListItem title={item.docData.title.toUpperCase()} onPress={() => {navigation.navigate('ScreenAdminPropertyEdit', {key:item.id})}} />}
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