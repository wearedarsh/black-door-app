import { app } from '../config/configFirebase'
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDoc, getDocs, onSnapshot, updateDoc, deleteField, where, query, get, Timestamp } from "firebase/firestore"

const db = getFirestore(app)

const UtilsFirestore = {
    addDocument: async function(payload){
        const { currentCollection, data } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const response = await addDoc(collectionRef, data)
            return { response: response, key: response.id }
        }catch(error){
            return { error: error.message }
        }
    },
    setDocument: async function(payload){
        const { currentCollection, data, key } = payload
        try{
            const docRef = doc(db, currentCollection, key)
            const response = await setDoc(docRef, data)
            return { success: true, message: 'document set successfully' }
        }catch(error){
            return { error: error.message }
        }
    },
    deleteDocumentByKey: async function(payload){
        const { currentCollection, key } = payload
        try{
            const collectionRef = collection(db, currentCollection)
            const docRef = doc(collectionRef, key)
            const response = await deleteDoc(docRef)
            return { success: true, message: 'document deleted successfully'}
        }catch(error){
            return { error: error.message}
        }
    },
    updateDocumentByKey: async function(payload){
        try{
            const { currentCollection, data, key } = payload
            const docRef = doc(db, currentCollection, key)
            const response = await updateDoc(docRef, data)
            return { success: true, message: 'document updated successfully' }
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
    getDocumentWhere: async function(payload) {
        const { currentCollection, conditions } = payload
        try {
            //create collection ref
            const collectionRef = collection(db, currentCollection)
            //dynamically create where conditions
            const queryConditions = 
                conditions.map((condition) => 
                where(condition.fieldName, condition.operator, condition.fieldValue)
                )
            //define final query
            const finalQuery = query(collectionRef, ...queryConditions)
            //fetch docs
            const querySnapshot = await getDocs(finalQuery)
            //check if document is returned
            if (querySnapshot.size === 1) {
                const docSnapshot = querySnapshot.docs[0]
                const response = docSnapshot.data()
                
                return { success: true, docData: response }
            } else {
                return { error: 'Single document not found' }
            }
        } catch (error) {
            return { error: error.message }
        }
        },
        getDocumentsWhere: async function(payload){
            const { queryRef } = payload

            try{
                //get docs
                const querySnapshot = await getDocs(queryRef)
                if(!querySnapshot.empty){
                    const documents = querySnapshot.docs.map((doc) => ({
                        docData:doc.data(),
                        id: doc.id
                    }))
                   
                    return { success: true, documents, numDocs: querySnapshot.size}
                }else{
                    return { error: 'Cannot fetch any documents' }
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
        },
        checkDocumentExists: async function(payload){
            const {currentCollection, key } = payload
            const collectionRef = collection(db, currentCollection)
            const docRef = doc(collectionRef, key)
            const docSnapshot = await getDoc(docRef)
            return docSnapshot.exists()
        },
        convertDateToFirestoreTimestamp: async function(payload){
            const { date } = payload
            const firestoreTimeStamp = Timestamp.fromDate(date)
            return firestoreTimeStamp
        },
        convertFirestoreTimestampToDate: async function(payload){
            const { date } = payload
            
            const dateString = date.toDateString()
            return dateString
        }
}

export default UtilsFirestore


