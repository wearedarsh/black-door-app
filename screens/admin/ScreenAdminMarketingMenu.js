import React from 'react'
import { StyleSheet, View } from 'react-native'
//components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'
import ComponentAdminTitle from '../../components/admin/componentAdminTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary';


const ScreenAdminMarketingMenu = ({navigation}) => {

    return (
      <>
        <ComponentAdminHeader />
            <View style={styles.container}>
                <ComponentAdminTitle title={'MARKETING'} />
                <View style={styles.form}>
                  <ComponentAppBtnPrimary label={'MANAGE GROUPS'} onPress={() => {navigation.navigate('ScreenAdminMarketingGroupManagement')}} />
                  <ComponentAppBtnPrimary label={'SEND NOTIFICATION'} onPress={() => {navigation.navigate('ScreenAdminMarketingNotificationManagement')}} />
                 
                </View>
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

export default ScreenAdminMarketingMenu;