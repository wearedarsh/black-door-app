import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
//screens
import StackOnboard from '../onboard/StackOnboard'
import StackApp from '../app/StackApp'
import StackAdmin from '../admin/StackAdmin'
//config
import ConfigApp from '../../config/configApp'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, getDocs, collection, query, orderBy, limit } from 'firebase/firestore'
//redux
import { setUserAuth } from '../../redux/actions/actionUserAuth'
import { useDispatch, useSelector } from 'react-redux'
//utils
import UtilsSecureStorage from '../../utils/utilsSecureStorage'
//stack
const Stack = createNativeStackNavigator()

const ScreenAuthFlow = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    //redux 
    const dispatch  = useDispatch()
    const userAuthState = useSelector((state) => state.userAuthState)
    
    useEffect(() => {
        const checkAuthentication = async () => {
            //check state to see if user saved in state
            if(userAuthState.authToken){
                //user logged in
                setIsAuthenticated(true)
                //user is admin
                if(userAuthState.authIsAdmin === 'true'){
                    setIsAdmin(true)
                }else{
                    setIsAdmin(false)
                }
                return
            }
            //Check to see if user saved in secure storage
            const authToken = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authToken'})
            const authDoc = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authDoc'})
            const authIsAdmin = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authIsAdmin'})
            if(authToken && authDoc && authIsAdmin){
                await dispatch(setUserAuth({authToken:authToken, authDoc: JSON.parse(authDoc), authIsAdmin:authIsAdmin}))
                await setIsAuthenticated(true)
                return
            }else{
                await setIsAuthenticated(false)
                return
            }
        }
        checkAuthentication();
    }, [userAuthState])

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