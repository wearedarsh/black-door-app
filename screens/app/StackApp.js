import React from 'react'
import { Platform } from 'react-native'
//screens
import ScreenAppHome from '../app/ScreenAppHome'
import ScreenAppSettings from '../app/ScreenAppSettings'
import ScreenAppPropertyListing from '../app/ScreenAppPropertyListing'
import ScreenAppViewings from '../app/ScreenAppViewings'

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
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.slateMedium,
            initialRouteName:"ScreenAppHome",
            headerStyle: {
              fontFamily: 'hero',
              backgroundColor: colors.slate,
            },
            headerTitleStyle: {
              fontFamily: 'hero', 
              fontSize: 16, 
              color:colors.white,
            },
            tabBarLabelStyle: {
              fontSize: 8,
              letterSpacing: 2,
              paddingLeft: Platform.OS === 'ios' ? 2 : 0,
              color: colors.white,
              fontFamily: 'primary-bold',
            },
            tabBarStyle:{
              backgroundColor: colors.slate,
              height:100,
              border: 'none'
            }
          }}
        >
            
            <Tabs.Screen 
              name="ScreenAppHome" 
              component={ScreenAppHome} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" color={color} size={32} />),
                tabBarLabel: 'HOME'
              }}  
            />
            <Tabs.Screen 
              name="ScreenAppPropertyListing" 
              component={ScreenAppPropertyListing} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="earth" color={color} size={32} />),
                tabBarLabel: 'PROPERTIES'
              }}  
            />
            <Tabs.Screen 
              name="ScreenAppViewings" 
              component={ScreenAppViewings} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-today-sharp" color={color} size={32} />),
                tabBarLabel: 'VIEWINGS',
                tabBarBadge: 2,
                tabBarBadgeStyle: {
                  backgroundColor: colors.gold, // Set the background color for the badge
                  color: colors.white, // Set the text color for the badge
                  marginTop:4,
                  fontSize: 10
                },
              }}  
            />
            <Tabs.Screen 
              name="ScreenAppSettings" 
              component={ScreenAppSettings} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings-outline" color={color} size={32} />),
                tabBarLabel: 'SETTINGS'
              }}  
            />
            </Tabs.Navigator>
            </>
            
    )
}

export default StackApp