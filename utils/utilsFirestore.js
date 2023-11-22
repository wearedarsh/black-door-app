import { app } from '../config/configFirebase'
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, onSnapshot, updateDoc, deleteField } from "firebase/firestore"

const db = getFirestore(app)

const UtilsFirestore = {
    addDocument: async function(payload){
        const { currentCollection, data } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const response = await addDoc(collectionRef, data)
            return { response: response, key: response.id}
        }catch(error){
            return {error: error}
        }
    },
    setDocument: async function(payload){
        const { currentCollection, data, key } = payload
        try{
            const docRef = doc(db, currentCollection, key)
            const response = await setDoc(docRef, data)
            return { success: true, message: 'document set successfully'}
        }catch(error){
            return { error: error }
        }
    },
    updateDocumentByKey: async function(payload){
        try{
            const { currentCollection, data, key } = payload
            const docRef = doc(db, currentCollection, key)
            const response = await updateDoc(docRef, data)
            return { success: true, message: 'document updated successfully'}
        }catch(error){
            return { error: error }
        }
    },
    getDocumentByKey: async function(payload){
        const { currentCollection, key } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const docRef = doc(collectionRef, key)
            const docSnapshot = await getDoc(docRef); 
            if(docSnapshot.exists()){
                const response = docSnapshot.data()
                return response
            }else{
                return {error: 'document does not exist'}
            }
        }catch(error){
            return { error: error }
        }
    },
    removeFieldFromDocument: async function(payload){
        const {currentCollection, key, field } = payload
        try{
            const docRef = doc(db, currentCollection, key)
            const response = await updateDoc(docRef, {
                [field]: deleteField()
            })
            return { success: true, message: 'field removed succesfully'}
        }catch(error){
            console.log(error)
            return {error: error}
        }
    }
}

export default UtilsFirestore


