import React from 'react';
import { StyleSheet, View, FlatList, ScrollView} from 'react-native';

//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'


const ScreenAdminUserEdit = (props) => {

    const feedback = false


    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'USER EDIT'} />
                {feedback && <ComponentAdminFeedback /> }
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter first name...'} label={'FIRST NAME'} />
                  <ComponentAdminInput placeholder={'Enter last name...'} label={'LAST NAME'} />
                  <ComponentAppBtnPrimary label={'EDIT USER'} />
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

export default ScreenAdminUserEdit