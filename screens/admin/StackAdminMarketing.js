import React from 'react'
//screens
import ScreenAdminMarketingMenu from '../admin/ScreenAdminMarketingMenu'
import ScreenAdminMarketingGroupManagement from '../admin/ScreenAdminMarketingGroupManagement'
import ScreenAdminMarketingGroupEdit from '../admin/ScreenAdminMarketingGroupEdit'
import ScreenAdminMarketingNotificationTest from '../admin/ScreenAdminMarketingNotificationTest'

//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackAdminMarketing = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAdminMarketingMenu" component={ScreenAdminMarketingMenu} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminMarketingGroupManagement" component={ScreenAdminMarketingGroupManagement} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminMarketingGroupEdit" component={ScreenAdminMarketingGroupEdit} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminMarketingNotificationTest" component={ScreenAdminMarketingNotificationTest} options={{headerShown: false}} />
                
        
        
            </Stack.Navigator>
    )
}

export default StackAdminMarketing