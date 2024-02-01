import React from 'react'
//screens
import ScreenAdminClientManagement from '../admin/ScreenAdminClientManagement'
import ScreenAdminClientAdd from '../admin/ScreenAdminClientAdd'
import ScreenAdminClientEdit from '../admin/ScreenAdminClientEdit'
import ScreenAdminClientMenu from '../admin/ScreenAdminClientMenu'
//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackAdminClient = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAdminClientManagement" component={ScreenAdminClientManagement} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminClientMenu" component={ScreenAdminClientMenu} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminClientEdit" component={ScreenAdminClientEdit} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminClientAdd" component={ScreenAdminClientAdd} options={{headerShown: false}} />
                
            </Stack.Navigator>
    )
}

export default StackAdminClient