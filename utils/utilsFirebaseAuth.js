import { app } from '../config/configFirebase'
import { getAuth, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

const UtilsFirebaseAuth = {
    createAuthUser: async function(payload){
        const { email, password } = payload
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)
            return response.user.uid
        }catch(error){
            let errorMessage
            if(error.code === 'auth/email-already-in-use'){
                errorMessage  =  'There is already an account associated with this email address'
            } else if (error.code === 'auth/invalid-email') {
                errorMessage  =  'Please enter a valid email address'
            } else if (error.code === 'auth/missing-email'){
                errorMessage  =  'Please enter an email address'
            } else if (error.code === 'auth/network-request-failed'){
                errorMessage  =  'There was a problem connecting, please ensure you have a network connection'
            } else {
                errorMessage  =  `There has been a problem ${error}`
            }
            return { error: errorMessage }
        }
    },
    checkAuthUser: async function(payload){
        const { email, password } = payload
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            return {uid: response.user.uid, idToken:response._tokenResponse.idToken}
        }catch(error){
            let errorMessage
            if(error.code === 'auth/wrong-password'){
                errorMessage = 'The password you entered is incorrect'
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address'
            } else if (error.code === 'auth/network-request-failed'){
                errorMessage = 'There was a problem connecting, please ensure you have a network connection'
            } else if (error.code === 'auth/invalid-email'){
                errorMessage = 'Please enter a valid email address'
            }else {
                errorMessage = `There has been a problem logging in, please try again ${error.code}`  
            }
            return {error: errorMessage}
        }
    },
    signOutAuthUser: async function(){
        signOut(auth)
    }
}

export default UtilsFirebaseAuth