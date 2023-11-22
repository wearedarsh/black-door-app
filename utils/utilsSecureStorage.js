import React from 'react'
import * as SecureStore from 'expo-secure-store'

export default UtilsSecureStorage = {
    addToSecureStorage: async function(payload){
        const { key, value } = payload
        try{
            await SecureStore.setItemAsync(key, value)
        }catch(error){
            return { error: error.message }
        }
    },
    fetchFromSecureStorage: async function(payload){
        const { key } = payload
        try{
            const value = await SecureStore.getItemAsync(key)
            return value 
        }catch(error){
            return { error: error.message }
        }
    },
    removeFromSecureStorage: async function(payload){
        const { key } = payload
        try{
            const value = await SecureStore.deleteItemAsync(key)
        }catch(error){
            return { error: error.message }
        }
    } 
}