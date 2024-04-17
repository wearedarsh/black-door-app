import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, onSnapshot, where, query, getDocs, orderBy } from "firebase/firestore"
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminSearch from '../../components/admin/componentAdminSearch'
import ComponentAdminListItem from '../../components/admin/componentAdminListItem'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminLoadingIndicator from '../../components/admin/componentAdminLoadingIndicator'
import ComponentAdminAddButton from '../../components/admin/componentAdminAddButton'
//utils
import UtilsValidation from '../../utils/utilsValidation'
import UtilsFirestore from '../../utils/utilsFirestore'

const ScreenAdminClientManagement = ({ navigation, route }) => {
    //local variables
    const { message = '' } = route?.params || {}
    //local state
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState([])
    const [searchText, setSearchText] = useState('')
    //firestore
    const db = getFirestore(app)
    //search filter
    const [filteredClients, setFilteredClients] = useState([])
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = clients.filter((item) => item.docData.firstName.toLowerCase().includes(searchString.toLowerCase()) || item.docData.lastName.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredClients(filteredArray)
    }
    //effect for if message is passed in route params
    useEffect(() => {
      if(message){
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:message, icon:'ios-warning'}})
      }
    },[message])
     //Real time updates for client list
     useEffect(() => {
      //build query
      const collectionRef = collection(db, 'users')
      const whereRef = where("isDeleted","==", false)
      const orderRef = orderBy("isActive", "asc")
      const alphaOrderRef = orderBy("lastName", "asc")
      const queryRef  = query(collectionRef, whereRef, orderRef, alphaOrderRef)
      //realtime query
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
          //map data to array for flatlist
          const clientsArray = snapshot.docs.map((doc) => ({
            docData:doc.data(),
            id: doc.id
          }))
          //update local state with new array
          setClients(clientsArray)
        })
    
      return () => {
        unsubscribe()
      }
    },[message])

    //update filtered clients with clients if updated
    useEffect(() => {
      setFilteredClients(clients)
    }, [clients])


    return (
      <>
        <ComponentAdminHeader />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminTitle title={'BUYER MANAGEMENT'} />
                
                <ComponentAdminAddButton onPress={() => {navigation.navigate('ScreenAdminClientAdd')}} title={'ADD BUYER'} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredClients &&
                <FlatList style={{width:'100%'}}
                  data={filteredClients}
                  renderItem={({ item }) => <ComponentAdminListItem icon={false} subTitle={!item.docData.isActive ? 'INACTIVE' : 'LIVE'} title={item.docData.firstName.toUpperCase() + ' ' + item.docData.lastName.toUpperCase()} onPress={() => {navigation.navigate('ScreenAdminClientMenu', {key:item.id, data: item.docData})}} />}
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

export default ScreenAdminClientManagement;