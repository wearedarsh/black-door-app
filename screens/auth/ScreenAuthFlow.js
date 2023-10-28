import React, { useEffect } from 'react'
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
import { setGroups } from '../../redux/actions/actionGroups'
import { useDispatch } from 'react-redux'
//stack
const Stack = createNativeStackNavigator()

const ScreenAuthFlow = () => {
    //redux 
    const dispatch  = useDispatch()
    const isAuthenticated = true;
    const isAdmin = true;
    //fetch relevant documents from firestore
    useEffect(() => {
        if(isAdmin){
            //fetch groups from firestore
            const fetchGroups = async () => {
                //assign query
                const db = getFirestore(app)
                
                const collectionRef = collection(db, 'groups')
                const orderByRef = orderBy("order", "asc")
                const queryRef = query(collectionRef, orderByRef, limit(ConfigApp.GroupLimit))
                //try to fetch data
                try{
                    const snapshot = await getDocs(queryRef)
                    const tempData = {}
                    snapshot.forEach((doc) => {
                        const data = doc.data()
                        tempData[doc.id] = {
                            title: data.title
                        }
                    })

                dispatch(setGroups({groups: tempData}))

                }catch(error){
                    //catch error here
                    console.log(error)
                }  
            }
            fetchGroups()
        }
    }, [])

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