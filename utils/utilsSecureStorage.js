import React from 'react'
import * as SecureStore from 'expo-secure-store'

export default UtilsSecureStorage = {
    addToSecureStorage: async function(payload){
        const { key, value } = payload
        try{
            await SecureStore.setItemAsync(key, value)
        }catch(error){
            console.log('There has been an error secure storage : ' + error)
        }
    },
    fetchFromSecureStorage: async function(payload){
        const { key } = payload
        try{
            const value = await SecureStore.getItemAsync(key)
            return value 
        }catch(error){
            console.log('There has been an error secure storage : ' + error)
            return null
        }
    },
    removeFromSecureStorage: async function(payload){
        const { key } = payload
        try{
            const value = await SecureStore.deleteItemAsync(key)
        }catch(error){
            console.log('There has been an error secure storage : ' + error)
            return null
        }
    } 
}