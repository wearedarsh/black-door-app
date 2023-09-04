import React from 'react'
//screens
import ScreenAppHome from '../app/ScreenAppHome'

//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackApp = () => {

    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAppHome" component={ScreenAppHome} options={{headerShown: false}} />
            </Stack.Navigator>
    )
}

export default StackApp