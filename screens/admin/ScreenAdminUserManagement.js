import React from 'react';
import { StyleSheet, View, FlatList, ScrollView} from 'react-native';

//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminSearch from '../../components/admin/componentAdminSearch'
import ComponentAdminListItem from '../../components/admin/componentAdminListItem'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'


const ScreenAdminUserManagement = (props) => {

    const data =[{id:0, title: 'user one'}, {id:1, title: 'user two'}, {id:2, title: 'user three'}]
    const feedback = false


    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'USER MANAGEMENT'} />
                <ComponentAdminSearch />
                {feedback && <ComponentAdminFeedback icon='warning' title={'please complete all fields'} />}

                <FlatList style={{width:'100%'}}
                  data={data}
                  renderItem={({ item }) => <ComponentAdminListItem title={item.title.toUpperCase()} onPress={() => {}} />}
                  keyExtractor={(item) => item.id}
                  showVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
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

export default ScreenAdminUserManagement;