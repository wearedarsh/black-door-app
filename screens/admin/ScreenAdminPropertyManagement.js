import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, ScrollView} from 'react-native'
//state
import { useDispatch, useSelector } from 'react-redux'
//utils functions
import UtilsFirestore from '../../utils/utilsFirestore'


//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminSearch from '../../components/admin/componentAdminSearch'
import ComponentAdminListItem from '../../components/admin/componentAdminListItem'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'


const ScreenAdminPropertyManagement = (props) => {
    const dispatch = useDispatch()
    const feedback = false
    const propertyState  = useSelector(state => state.propertyState)

    const data =[{id:0, title: 'title one'}, {id:1, title: 'title two'}, {id:2, title: 'title three'}]

    useEffect(() => {
      getDocument = async function(){
          const document = await UtilsFirestore.getDocumentByKey({currentCollection: 'properties', key:'6asyNuohft0p14G2Ops3'})
          const state = await dispatch({type: 'property/set', payload:{data: document}})
      }
      getDocument() 
    },[])

    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY MANAGEMENT'} />
                <ComponentAdminSearch />
                {feedback && <ComponentAdminFeedback icon='warning' title={'please complete all fields'} />}

                <FlatList style={{width:'100%'}}
                  data={data}
                  renderItem={({ item }) => <ComponentAdminListItem title={item.title.toUpperCase()} onPress={() => {dispatch({type: 'property/remove'})}} />}
                  keyExtractor={(item) => item.id}
                  showVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter first name...'} label={'FIRST NAME'} />
                  <ComponentAdminInput placeholder={'Enter last name...'} label={'LAST NAME'} />
                </ScrollView>
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