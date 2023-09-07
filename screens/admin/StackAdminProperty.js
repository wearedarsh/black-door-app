import React from 'react'
//screens
import ScreenAdminPropertyManagement from '../admin/ScreenAdminPropertyManagement'
import ScreenAdminPropertyAdd from '../admin/ScreenAdminPropertyAdd'
import ScreenAdminPropertyEdit from '../admin/ScreenAdminPropertyEdit'
//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackAdminProperty = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAdminPropertyManagement" component={ScreenAdminPropertyManagement} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminPropertyAdd" component={ScreenAdminPropertyAdd} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAdminPropertyEdit" component={ScreenAdminPropertyEdit} options={{headerShown: false}} />
        
            </Stack.Navigator>
    )
}

export default StackAdminProperty