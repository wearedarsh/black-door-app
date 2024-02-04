import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminListItem = (props) => {
    const { title = 'SET TITLE PROP', subTitle = '', onPress=()=>{}, status, icon} = props
    let style = {}
    
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
        {icon && <View style={{flex: 1, alignItems:'center'}}>
          <Ionicons name={icon} size={16} color={colors.slate} style={{marginRight:8}} />
        </View>
        }
        <View style={{flex:6, justifyContent:'center', flexDirection:'column'}}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text> }
        </View>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Ionicons name="chevron-forward" size={32} color={colors.gold} />
        </View>  
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
        flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.slate,
        padding:8,
        paddingHorizontal: 16
      },
      title: {
        color:colors.slate,
        fontSize: 16,
        fontFamily: 'primary-medium',
        letterSpacing: 1,
        paddingLeft: Platform.OS === 'ios' ? 1 : 0,
        marginTop: -3
      },
      subTitle: {
        color:colors.gold,
        fontSize: 12,
        fontFamily: 'primary-medium',
        letterSpacing: 1,
        paddingLeft: Platform.OS === 'ios' ? 1 : 0,
        marginTop: -3
      },
      row:{
        flexDirection: 'row',
        alignItems: 'center'
      }
      
});

export default ComponentAdminListItem;