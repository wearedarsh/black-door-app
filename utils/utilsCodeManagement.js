import UtilsFirestore from './utilsFirestore'
import UtilsEncryption from './utilsEncryption'

const UtilsCodeManagement = {
    checkCodeExists: async function(payload){
        const { hashedCode, firestoreTimeStamp } = payload
        console.log(firestoreTimeStamp)
        try{
            //grab a snapshot from firestore
            const response = await UtilsFirestore.getDocumentWhere({currentCollection: 'inviteCodes', conditions: [{fieldName: 'expiryDate', condition: '<', fieldValue: firestoreTimeStamp},{fieldName: 'hashedCode', operator: '==', fieldValue:hashedCode},{fieldName: 'redeemed', operator: '==', fieldValue: false}]})
            if(response.error){
                return { error: response.error}
            }else{
                return { success: true, data: response.docData }
            }
        }catch(error){
            return { error: message.error }
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
    }
}

export default UtilsCodeManagement