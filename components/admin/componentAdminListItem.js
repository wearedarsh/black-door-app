import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminListItem = (props) => {
    const { title = 'SET TITLE PROP', onPress=()=>{}} = props
  return (
    <TouchableOpacity style={styles.listItem}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="chevron-forward" size={32} color={colors.gold} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
        width:'100%',
        height:48,
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.slate
      },
      title: {
        color:colors.slate,
        fontSize: 16,
        fontFamily: 'primary-medium',
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
      }
      
});

export default ComponentAdminListItem;