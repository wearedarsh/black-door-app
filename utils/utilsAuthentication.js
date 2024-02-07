//utils
import UtilsSecureStorage from './utilsSecureStorage'
import UtilsFirebaseAuth from './utilsFirebaseAuth'
//redux
import { removeUserAuth } from '../redux/actions/actionUserAuth'
import { useDispatch, useSelector } from 'react-redux'


export default UtilsAuthentication = {
    setAuthUser: async function(payload){
        const { dispatch, authToken, authUserData } = payload
        dispatch({type: 'authentication/set', payload: {authToken: authToken, authUserData: authUserData}})
    },
    logoutAuthUser: async function(payload){
        const { dispatch } = payload
        dispatch({type: 'authentication/logout'})
    },
    logoutUser: async function(payload){
        const { dispatch } = payload
        try{
            //remove from securestorage
            await UtilsSecureStorage.removeFromSecureStorage({ key: 'authId'})
            await UtilsSecureStorage.removeFromSecureStorage({ key: 'authUserKey'})
            await UtilsSecureStorage.removeFromSecureStorage({ key: 'authToken'})
            await UtilsSecureStorage.removeFromSecureStorage({ key: 'authDoc'})
            await UtilsSecureStorage.removeFromSecureStorage({ key: 'authIsAdmin'})
            //log out auth
            await UtilsFirebaseAuth.signOutAuthUser()
            await dispatch(removeUserAuth())
            return { success: true, message: 'User succesfully logged out'}
        }catch(error){
            return { error: error.message}
        }

    }
}