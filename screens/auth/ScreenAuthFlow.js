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
//expo
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Device from 'expo-device'


const ScreenAuthFlow = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    //redux 
    const dispatch  = useDispatch()
    const userAuthState = useSelector((state) => state.userAuthState)
    
    //foreground notification handler
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        })
      })
    //create actions for notification
    const viewDetailsAction = { identifier: 'view', buttonTitle: 'View Details' }
    const dismissAction = { identifier: 'dismiss', buttonTitle: 'Dismiss' }

    //set a notification category for listing
    Notifications.setNotificationCategoryAsync('propertyListing', [viewDetailsAction, dismissAction])

    //if notification is received whilst in app
    const handleNotification = (notification) => {
        //may be required
    }
    const handleNotificationAction = (notification) => {
        //may be required
    }
    //listen for push notifications
    useEffect(() => {
        if(Device.isDevice){
        //set up a listener for received
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            notificationData = notification.request.content.data
        })
        //set up a listener for actions
        const notificationActionListener = Notifications.addNotificationResponseReceivedListener((response) => {
            const { actionIdentifier } = response
            notificationData = response.notification.request.content.data

            switch(actionIdentifier) {
                case 'view' :
                    console.log('I will view this screen: ' + notificationData.screen)
                break

                case 'dismiss' :
                    console.log('I will dismiss')
                break

                default:
                    console.log('I am the fall back plan')
                break
            }
        })
        }
      }, [])

    useEffect(() => {
        //check push notification token
        const checkPushToken = async () => {
            const projectId = Constants.expoConfig.extra.eas.projectId
            //fetch current token
            const currentToken = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data
            const storedToken = userAuthState.authExpoToken
            const pushOptIn = userAuthState.authDoc.pushOptIn
            //fetch current permissions
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
        }
        
        if(isAuthenticated){
            //check device tokens upon log in
            if(Device.isDevice){
                checkPushToken()
            }
            //firestore key for user
            const key = userAuthState.authUserKey
            //firestore
            const db = getFirestore(app)
            const collectionRef = collection(db, 'users')
            const queryRef = doc(collectionRef, key)
            //real time user updates
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                const userData = snapshot.data()
                //update user doc
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
            const authExpoToken = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authExpoToken'})
            const authUserKey = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authUserKey'})
            const authId = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authId'})
            const authToken = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authToken'})
            const authDoc = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authDoc'})
            const authIsAdmin = await UtilsSecureStorage.fetchFromSecureStorage({key: 'authIsAdmin'})
            if(authToken && authDoc && authIsAdmin && authId && authUserKey && authExpoToken){
                console.log('I have all mee tokens')
                await dispatch(setUserAuth({authExpoToken: authExpoToken, authUserKey: authUserKey, authId: authId, authToken:authToken, authDoc: JSON.parse(authDoc), authIsAdmin:authIsAdmin}))
                await setIsAuthenticated(true)
                return
            }else{
                console.log('I dont have all mee tokens')
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