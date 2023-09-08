import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';

//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAdminFeedback from '../../components/admin/componentAdminFeedback'
import ComponentAdminInput from '../../components/admin/componentAdminInput'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary';


const ScreenAdminPropertyAdd = (props) => {
    const feedback = false


    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'PROPERTY ADD'} />
                {feedback && <ComponentAdminFeedback /> }
                <ScrollView style={styles.form}>
                  <ComponentAdminInput placeholder={'Enter title...'} label={'HEADLINE'} />
                  <ComponentAdminInput placeholder={'Enter location..'} label={'LOCATION'} />
                  <ComponentAppBtnPrimary label={'ADD PROPERTY'} />
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

export default ScreenAdminPropertyAdd;