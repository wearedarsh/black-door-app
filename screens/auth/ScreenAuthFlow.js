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
import { getFirestore, collection, doc, onSnapshot, where, query, getDocs } from 'firebase/firestore'
//redux
import { setUserAuth, updateUserAuthDoc } from '../../redux/actions/actionUserAuth'
import { useDispatch, useSelector } from 'react-redux'
//utils
import UtilsSecureStorage from '../../utils/utilsSecureStorage'
import UtilsAuthentication from '../../utils/utilsAuthentication'
//stack
const Stack = createNativeStackNavigator()

const ScreenAuthFlow = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    //redux 
    const dispatch  = useDispatch()
    const userAuthState = useSelector((state) => state.userAuthState)
    
    //check for changes to the user doc
    useEffect(() => {
        if(isAuthenticated){
            //firestore key for user
            const key = userAuthState.authUserKey
            //firestore
            const db = getFirestore(app)
            const collectionRef = collection(db, 'users')
            const queryRef = doc(collectionRef, key)
            //real time user updates
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                const userData = snapshot.data()
                dispatch(updateUserAuthDoc({authDoc: userData}))
            })
            //unsubscribe on unmount
            return () => {
                unsubscribe()
            }
        }
    },[isAuthenticated])

    //If the users status is updated log them out
    useEffect(() => {
        let statusChanged = false
        //if user is deleted logout
        if(userAuthState.authToken && userAuthState.authDoc.isDeleted){
            statusChanged = true
        }
        //if user is deactivated logout
        if(userAuthState.authToken && !userAuthState.authDoc.isActive){
            statusChanged = true
        }
        //log the user out of the app
        if(statusChanged){
            const logOutUser = async () => {
                const response = await UtilsAuthentication.logoutUser({dispatch})
            }
            logOutUser()
        }
        
    }, [userAuthState.authDoc])
    
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
            const authUserKey = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authUserKey'})
            const authId = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authId'})
            const authToken = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authToken'})
            const authDoc = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authDoc'})
            const authIsAdmin = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authIsAdmin'})
            if(authToken && authDoc && authIsAdmin && authId && authUserKey){
                await dispatch(setUserAuth({authUserKey: authUserKey, authId: authId, authToken:authToken, authDoc: JSON.parse(authDoc), authIsAdmin:authIsAdmin}))
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