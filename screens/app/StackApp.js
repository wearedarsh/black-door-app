import React from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
//screens
import ScreenAppHome from '../app/ScreenAppHome'
import ScreenAppSettings from '../app/ScreenAppSettings'
import ScreenAppPropertyListing from '../app/ScreenAppPropertyListing'
import ScreenAppViewings from '../app/ScreenAppViewings'
//stacks
import StackAppProperty from '../app/StackAppProperty'
//components
import ComponentAppTabItem from '../../components/componentAppTabItem'
//colors
import { colors } from '../../assets/style/theme'
//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//stack
const Tabs = createBottomTabNavigator()
//icons
import { Ionicons } from '@expo/vector-icons'

const StackApp = () => {
    return (
        <>
        <Tabs.Navigator 
          screenOptions={{
            headerShown: false,
            initialRouteName:"ScreenAppHome",
            tabBarLabelStyle: {
              display:'none',
            },
            tabBarStyle:{
              backgroundColor: colors.secondary,
              paddingBottom:8,//height:100,
              height:80,
              alignItems: 'flex-start',
              borderTopWidth: 0
            }
          }}
        >
            <Tabs.Screen 
              name="ScreenAppHome" 
              component={ScreenAppHome} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'HOME'} icon={'home-outline'} focused={focused} />
                ),
              }}  
            />
            <Tabs.Screen 
              name="StackAppProperty" 
              component={StackAppProperty} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'LISTINGS'} icon={'earth'} focused={focused} />
                ),
              }}   
            />
            <Tabs.Screen 
              name="ScreenAppViewings" 
              component={ScreenAppViewings} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <ComponentAppTabItem label={'VIEWINGS'} icon={'ios-today-sharp'} focused={focused} />
                ),
                tabBarBadge: 2,
                tabBarBadgeStyle: {
                  backgroundColor: colors.primary, // Set the background color for the badge
                  color: colors.white, // Set the text color for the badge
                  marginTop:Platform.OS === 'android' ? 12 : 4,
                  fontSize: 10
                },
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