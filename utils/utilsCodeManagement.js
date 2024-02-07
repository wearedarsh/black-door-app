import UtilsFirestore from './utilsFirestore'
import UtilsEncryption from './utilsEncryption'

import { app } from '../config/configFirebase'
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore"

const db = getFirestore(app)

const UtilsCodeManagement = {
    checkCodeExists: async function(payload){
        const { hashedCode, firestoreTimeStamp } = payload
        try{
            //build the query
            const codeQuery = query(
                collection(db, 'inviteCodes'),
                where("hashedCode", "==", hashedCode),
                where("redeemed", "==", false),
                where("expiresAt", ">", firestoreTimeStamp) 
            )
            //get snapshot 
            const querySnapshot = await getDocs(codeQuery)
            //refrerence docs
            const queryDocs = querySnapshot.docs
            //
            if(queryDocs.length === 1){
                return { success: true, data: queryDocs[0].data(), id: queryDocs[0].id}
            }else{
                return { error: 'This code does not exist'}
            }
        }catch(error){
            return { error: error.message }
        }
    },
    addCode: async function(payload){
        const { hashedCode, expiresAt, userId } = payload
        try{
            //add the code as key with userkey as value
            const response  = await UtilsFirestore.addDocument({currentCollection: 'inviteCodes', data: { hashedCode, redeemed: false, expiresAt, userId }})
            if(response.error){
                return { error: response.error }
            }else {
                return { success: true }
            }
        }catch(error){
            return {error: error.message}
        }
    },
 
    checkLiveCodeForUser: async function(payload){
        const { currentCollection, userId, firestoreTimeStamp } = payload
        
        try{
            //set collection ref
            const collectionRef = collection(db, currentCollection)
            //build the query
            const idWhere = where("userId", "==", userId)
            const redeemedWhere = where("redeemed", "==", false)
            const expiresWhere = where("expiresAt", ">", firestoreTimeStamp) 
            const compoundQuery = query(collectionRef, idWhere, redeemedWhere, expiresWhere)
            //get snapshot 
            const querySnapshot = await getDocs(compoundQuery)
            //refrerence docs
            const queryDocs = querySnapshot.docs
            //
            if(queryDocs.length === 1){
                return { success: true, data: queryDocs[0].data(), codeKey: queryDocs[0].id}
            }else{
                return { error: 'This code does not exist'}
            }
        }catch(error){
            return { error: error.message}

        }
    }

}

export default UtilsCodeManagement