import React from 'react'
import { StatusBar } from 'react-native'
//screens
import StackOnboard from '../onboard/StackOnboard'
import StackApp from '../app/StackApp'
import StackAdmin from '../admin/StackAdmin'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const ScreenAuthFlow = () => {

    const isAuthenticated = true;
    const isAdmin = false;

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator>
                {isAuthenticated ?
                isAdmin ? <Stack.Screen name="StackAdmin" component={StackAdmin} options={{headerShown: false}} /> : <Stack.Screen name="StackApp" component={StackApp} options={{headerShown: false}} /> 
                :
                <Stack.Screen name="StackOnboard" component={StackOnboard} options={{headerShown: false}} />
                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ScreenAuthFlow