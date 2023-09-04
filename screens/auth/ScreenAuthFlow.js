import React from 'react'
import { StatusBar } from 'react-native'
//screens
import ScreenOnboardEnterCode from '../onboard/ScreenOnboardEnterCode'
import ScreenOnboardHome from '../onboard/ScreenOnboardHome'
import ScreenOnboardCheckDetails from '../onboard/ScreenOnboardCheckDetails'
import ScreenOnboardGDPR from '../onboard/ScreenOnboardGDPR'
import ScreenLoginEnterDetails from '../login/ScreenLoginEnterDetails'
import ScreenLoginForgottenPassword from '../login/ScreenLoginForgottenPassword'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const ScreenAuthFlow = () => {

    const isAuthenticated = true;
    
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator>
                <Stack.Screen name="ScreenOnboardHome" component={ScreenOnboardHome} options={{headerShown: false}} />
                <Stack.Screen name="ScreenOnboardEnterCode" component={ScreenOnboardEnterCode} options={{headerShown: false}} />
                <Stack.Screen name="ScreenOnboardCheckDetails" component={ScreenOnboardCheckDetails} options={{headerShown: false}} />
                <Stack.Screen name="ScreenOnboardGDPR" component={ScreenOnboardGDPR} options={{headerShown: false}} />
                <Stack.Screen name="ScreenLoginEnterDetails" component={ScreenLoginEnterDetails} options={{headerShown: false}} />
                <Stack.Screen name="ScreenLoginForgottenPassword" component={ScreenLoginForgottenPassword} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ScreenAuthFlow