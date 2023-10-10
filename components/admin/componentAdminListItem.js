import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminListItem = (props) => {
    const { title = 'SET TITLE PROP', onPress=()=>{}} = props
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="chevron-forward" size={32} color={colors.gold} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
        width:'100%',
        paddingHorizontal: 32,
        paddingVertical: 8,
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
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
      }
      
});

export default ComponentAdminListItem;