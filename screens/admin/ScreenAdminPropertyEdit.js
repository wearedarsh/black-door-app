import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
//Components
import ComponentAdminHeader from '../../components/admin/componentAdminHeader'

const ScreenAdminPropertyEdit = (props) => {
  return (
    <>
    <ComponentAdminHeader />
    <View style={styles.container}>
      <Text>Screen admin property edit</Text>
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

export default ScreenAdminPropertyEdit;