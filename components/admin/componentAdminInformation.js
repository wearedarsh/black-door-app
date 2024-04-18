import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminInformation = (props) => {
const { information = 'SET INFORMATION PROP', icon = true, iconName = 'information-circle'} = props

  return (
    <View style={styles.listItem}>
       {icon && <Ionicons name={iconName} size={16} color={colors.secondary} style={{marginRight:8}} />}
        <View style={{flex:9, justifyContent:'flex-start'}}>
          <Text style={styles.title}>{information.toUpperCase()}</Text>
        </View>
    </View>
  )

}

const styles = StyleSheet.create({
    listItem: {
        flexDirection:'row',
        borderWidth: 1,
        borderColor: colors.secondary,
        padding:8,
        alignItems:'center'
      },
      title: {
        color:colors.secondary,
        fontSize: 12,
        fontFamily: 'primary-medium',
        letterSpacing: 1,
        paddingLeft: Platform.OS === 'ios' ? 1 : 0,
        marginTop: -3
      }
      
});

export default ComponentAdminInformation