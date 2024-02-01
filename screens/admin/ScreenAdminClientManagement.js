import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, collection, onSnapshot } from "firebase/firestore"
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
    const collectionRef = collection(db, 'users')
    //search filter
    const [filteredClients, setFilteredClients] = useState([])
    const onSearchChange = (searchString) => {
      setSearchText(searchString)
      const filteredArray = clients.filter((item) => item.docData.firstName.toLowerCase().includes(searchString.toLowerCase()) || item.docData.lastName.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredClients(filteredArray)
    }

    useEffect(() => {
      if(message){
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:message, icon:'ios-warning'}})
      }
    },[message])
     //firestore listener
     useEffect(() => {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          setLoading(true)
          const clientsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            docData: doc.data()
          }))

          clientsArray.sort((a,b) => {
            const statusA = a.docData.status === 1 ? -1 : 1;
            const statusB = b.docData.status === 1 ? -1 : 1;
            return statusA - statusB;
          })
          setClients(clientsArray)
          setLoading(false)
      }, (error) => {
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:error.message, icon:'ios-warning'}})
      })
      //clean up function
      return () => {
        unsubscribe()
      }
    },[])
    //update filtered clients with clients if updated
    useEffect(() => {
      setFilteredClients(clients)
    }, [clients])


    return (
      <>
        <ComponentAdminHeader />
        {loading && <ComponentAdminLoadingIndicator /> }
            <View style={styles.container}>
                <ComponentAdminTitle title={'CLIENT MANAGEMENT'} />
                <ComponentAdminAddButton onPress={() => {navigation.navigate('ScreenAdminClientAdd')}} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredClients &&
                <FlatList style={{width:'100%'}}
                  data={filteredClients}
                  renderItem={({ item }) => <ComponentAdminListItem status={item.docData.status === 1 ? 'email-sent' : null} title={item.docData.firstName.toUpperCase() + ' ' + item.docData.lastName.toUpperCase()} onPress={() => {navigation.navigate('ScreenAdminClientMenu', {userKey:item.id, title: item.docData.firstName.toUpperCase() + ' ' + item.docData.lastName.toUpperCase()})}} />}
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