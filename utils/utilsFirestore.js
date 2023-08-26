import { app } from '../config/configFirebase'
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"

const db = getFirestore(app)

const UtilsFirestore = {
    addDocument: async function(payload){
        const { currentCollection, data } = payload
        try{
            const collectionRef = collection(db, currentCollection);
            const response = await addDoc(collectionRef, data);
            return { response: response}
        }catch(error){
            return {error: error}
        }
    },
    setDocument: async function(payload){
        const { currentCollection, data, key } = payload
        try{
            const docRef = doc(db, currentCollection, key)
            const response = setDoc(docRef, data)
            return { response: response }
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
            const response = docSnapshot.data()
            return response
        }catch(error){
            return{error: error}
        }
    }
}

export default UtilsFirestore

