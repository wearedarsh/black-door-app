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

    useEffect(() => {
      if(message){
        UtilsValidation.showHideFeedback({duration: 3000, setterFunc:setFeedback, data: {title:message, icon:'ios-warning'}})
      }
    },[message])
     //firestore listener
     useEffect(() => {
      //fetch clients
      const fetchClients = async () => {
      try{
        //setLoading(true)
        const collectionRef = collection(db, 'users')
        const whereRef = where("isDeleted","==", false)
        const queryRef  = query(collectionRef, whereRef)
        const orderRef = orderBy("isActive", "asc")

        const response = await UtilsFirestore.getDocumentsWhere({queryRef})
        if(response.success){
          const { documents } = response 
          setClients(documents)
          setLoading(false)
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
    }

      fetchClients()
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
                <ComponentAdminTitle title={'CLIENT MANAGEMENT'} />
                <ComponentAdminAddButton onPress={() => {navigation.navigate('ScreenAdminClientAdd')}} />
                <ComponentAdminSearch onChangeText={onSearchChange} value={searchText} />
                {feedback && <ComponentAdminFeedback icon={feedback.icon} title={feedback.title} />}
                {filteredClients &&
                <FlatList style={{width:'100%'}}
                  data={filteredClients}
                  renderItem={({ item }) => <ComponentAdminListItem icon={item.docData.isActive === false ? 'keypad' : null} title={item.docData.firstName.toUpperCase() + ' ' + item.docData.lastName.toUpperCase()} onPress={() => {navigation.navigate('ScreenAdminClientMenu', {userKey:item.id, clientData: item.docData})}} />}
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