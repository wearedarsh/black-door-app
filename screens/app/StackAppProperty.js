import React from 'react'
//screens
import ScreenAppPropertyListing from '../app/ScreenAppPropertyListing'
import ScreenAppPropertyView from '../app/ScreenAppPropertyView'
//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//stack
const Stack = createNativeStackNavigator()

const StackAppProperty = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen name="ScreenAppPropertyListing" component={ScreenAppPropertyListing} options={{headerShown: false}} />
                <Stack.Screen name="ScreenAppPropertyView" component={ScreenAppPropertyView} options={{headerShown: false}} />
            </Stack.Navigator>
    )
}

export default StackAppProperty