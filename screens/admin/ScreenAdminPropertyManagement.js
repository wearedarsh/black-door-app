import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'

const ScreenAdminPropertyManagement = (props) => {
  return (
    <>
    <ComponentAdminHeader />
    <View style={styles.container}>
      <Text>Screen admin property management</Text>
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

export default ScreenAdminPropertyManagement;