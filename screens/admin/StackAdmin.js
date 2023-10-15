import React from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
//screens
import ScreenAppSettings from '../app/ScreenAppSettings'
import StackAdminProperty from '../admin/StackAdminProperty'
import StackAdminClient from '../admin/StackAdminClient'

//components
import ComponentAppTabItem from '../../components/componentAppTabItem'

//colors
import { colors } from '../../assets/style/theme'
//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//stack
const Tabs = createBottomTabNavigator()
//icons

const StackApp = () => {

    
    return (
        <>
        <Tabs.Navigator 
          screenOptions={{
            headerShown: false,
            initialRouteName:"ScreenAdminPropertyManagement",
            tabBarLabelStyle: {
              display:'none',
            },
            tabBarStyle:{
              backgroundColor: colors.slate,
              height:100,
              alignItems: 'flex-start',
              borderTopWidth: 0
            }
          }}
        >
            <Tabs.Screen 
              name="StackAdminProperty" 
              component={StackAdminProperty} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'PROPERTIES'} icon={'earth'} focused={focused} />
                ),
              }}  
            />
            <Tabs.Screen 
              name="StackAdminClient" 
              component={StackAdminClient} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'CLIENTS'} icon={'person-outline'} focused={focused} />
                ),
              }}   
            />
            
            <Tabs.Screen 
              name="ScreenAppSettings" 
              component={ScreenAppSettings} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'SETTINGS'} icon={'settings-outline'} focused={focused} /> 
                ),
              }}   
            />
            </Tabs.Navigator>
            </>
            
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
      fontFamily:'primary-regular', 
      fontSize: 8, 
      letterSpacing: 2, 
      marginTop: 4, 
      paddingLeft: Platform.OS === 'ios' ? 2 : 0,
      color: colors.white
    }
})

export default StackApp