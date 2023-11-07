import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminListItem = (props) => {
    const { title = 'SET TITLE PROP', onPress=()=>{}, status} = props
    let icon = ''
    let style = {}
    switch(status){
      case 'email-sent':
      icon = 'mail'
      break 
    }
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
       <View style={styles.row}>{icon && <Ionicons name={icon} size={16} color={colors.slate} style={{marginRight:8}} />}<Text style={styles.title}>{title}</Text></View>
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
      },
      row:{
        flexDirection: 'row',
        alignItems: 'center'
      }
      
});

export default ComponentAdminListItem;