import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAppTabItem = (props) => {
    const {focused=false, icon='earth', label='set label prop' } = props
    return(
        <View style={styles.menuItemHolder}>
            <Ionicons  name={icon}  style={{marginTop: Platform.OS === 'android' ? -16 : 0,}} color={focused ? colors.white : colors.slateMedium} size={32} />
            <Text style={{...styles.menuLabel}}>{label}</Text>
        </View>  
    )
}

const styles = StyleSheet.create({
    menuItemHolder: {
        height: '100%',
        alignItems: 'center', 
        justifyContent:'center', 
        paddingTop: 8
      },
      menuLabel: {
        fontFamily:'primary-medium', 
        fontSize: 8, 
        letterSpacing: 2, 
        marginTop: 4, 
        paddingLeft: Platform.OS === 'ios' ? 2 : 0,
        color: colors.white,
        textAlign:'center'
      }
})

export default ComponentAppTabItem