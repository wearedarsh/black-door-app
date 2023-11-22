import { app } from '../config/configFirebase'
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs, onSnapshot, updateDoc, deleteField, where, query } from "firebase/firestore"

const db = getFirestore(app)

const UtilsFirestore = {
    addDocument: async function(payload){
        const { currentCollection, data } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const response = await addDoc(collectionRef, data)
            return { response: response, key: response.id}
        }catch(error){
            return { error: error.message }
        }
    },
    setDocument: async function(payload){
        const { currentCollection, data, key } = payload
        try{
            const docRef = doc(db, currentCollection, key)
            const response = await setDoc(docRef, data)
            return { success: true, message: 'document set successfully'}
        }catch(error){
            return { error: error.message }
        }
    },
    updateDocumentByKey: async function(payload){
        try{
            const { currentCollection, data, key } = payload
            const docRef = doc(db, currentCollection, key)
            const response = await updateDoc(docRef, data)
            return { success: true, message: 'document updated successfully'}
        }catch(error){
            return { error: error.message }
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
            return { error: error.message }
        }
    },
    getDocumentWhere: async function(payload){
        const { currentCollection, fieldName, fieldValue } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const queryRef = query(collectionRef, where(fieldName, '==', fieldValue))
            const querySnapshot = await getDocs(queryRef)
            if(querySnapshot.size === 1){
                const docSnapshot = querySnapshot.docs[0];
                const response = docSnapshot.data();
                return { success: true, docData: response };
            }else if (querySnapshot.size === 0) {
                return { error: 'Document does not exist' };
            } else {
                return { error: 'Multiple documents found with the same field value' };
            }
        }catch(error){
            return { error: error.message }
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
            return { error: error.message }
        }
    }
}

export default UtilsFirestore


