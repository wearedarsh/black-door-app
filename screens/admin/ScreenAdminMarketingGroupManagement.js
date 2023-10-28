import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
//config
import ConfigApp from '../../config/configApp'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, onSnapshot, orderBy, limit, query } from "firebase/firestore"
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
    const [groups, setGroups] = useState([])
    const [searchText, setSearchText] = useState('')
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, 'groups')
    const queryRef = query(collectionRef, orderBy("order", "asc"), limit(ConfigApp.GroupLimit))
    //search filter
    const [filteredGroups, setFilteredGroups] = useState([])
    //search function
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = groups.filter((item) => item.docData.title.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredGroups(filteredArray)
    }
    //firestore listener
    useEffect(() => {
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
          setLoading(true)
          const groupsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            docData: doc.data()
          }))
          setGroups(groupsArray)
          setLoading(false)
      }, (error) => {
        UtilsValidation.showHideFeedback({icon:'ios-warning', title: 'error', duration:3000, setterFunc: setFeedback})
      })

      //clean up function
      return () => {
        unsubscribe()
      }
    },[])
    //update filtered properties with properties if updated
    useEffect(() => {
      setFilteredGroups(groups)
    }, [groups])
    return (
      <>
        <ComponentAdminHeader />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminTitle title={'GROUP MANAGEMENT'} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredGroups &&    
                  <FlatList style={{width:'100%'}}
                    data={filteredGroups}
                    renderItem={({ item }) => <ComponentAdminListItem title={item.docData.title} onPress={() => {navigation.navigate('ScreenAdminMarketingGroupEdit', {key:item.id})}} />}
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