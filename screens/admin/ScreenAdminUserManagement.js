import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
//Components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'

const ScreenAdminUserManagement = (props) => {
  return (
    <>
    <ComponentAdminHeader />
    <View style={styles.container}>
      <Text>Screen admin user management</Text>
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ScreenAdminUserManagement;