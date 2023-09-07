import React from 'react'
//screens
import ScreenAdminUserManagement from '../admin/ScreenAdminUserManagement'
import ScreenAdminUserAdd from '../admin/ScreenAdminUserAdd'
import ScreenAdminUserEdit from '../admin/ScreenAdminUserEdit'
//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackAdminUser = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAdminUserManagement" component={ScreenAdminUserManagement} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminUserAdd" component={ScreenAdminUserAdd} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminUserEdit" component={ScreenAdminUserEdit} options={{headerShown: false}} />
        
            </Stack.Navigator>
    )
}

export default StackAdminUser