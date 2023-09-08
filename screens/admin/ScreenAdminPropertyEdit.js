import React from 'react';
import { StyleSheet, View, FlatList, ScrollView} from 'react-native';

//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'


const ScreenAdminPropertyEdit = (props) => {

    const feedback = false


    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY EDIT'} />
                {feedback && <ComponentAdminFeedback /> }
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter title...'} label={'HEADLINE'} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'LOCATION'} />
                  <ComponentAppBtnPrimary label={'EDIT PROPERTY'} />
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

export default ScreenAdminPropertyEdit