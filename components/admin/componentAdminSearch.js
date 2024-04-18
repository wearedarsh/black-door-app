import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminSearch = (props) => {
  const { onChangeText, value } = props
  
  return (
        <View style={styles.wrapper}>
            <TextInput style={styles.searchInput} placeholder='Search...' placeholderTextColor={colors.white} onChangeText={onChangeText} value={value}  />
        </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom:16,
        paddingHorizontal: 32,
        backgroundColor:colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
      },
      searchInput: {
          height:48,
          width:'100%',
          borderWidth:2,
          fontSize: 16,
          borderColor: colors.white,
          backgroundColor: colors.secondary,
          color: colors.white,
          fontFamily: 'primary-regular',
          paddingLeft:16
      }
});

export default ComponentAdminSearch;