import UtilsFirestore from './utilsFirestore'
import UtilsEncryption from './utilsEncryption'

const UtilsCodeManagement = {
    checkCodeExists: async function(payload){
        const { code, expectedLength = 4 } = payload
        //check code is not empty
        if(code == ''){
            return {error: 'Please enter your code'}
        }
        //check code is expected length
        if(code.length != expectedLength){
            return {error: `Please enter ${expectedLength} characters`}
        }
        try{
            //get codes config document from firestore
            const codesDocument = await UtilsFirestore.getDocumentByKey({currentCollection: 'config', key: 'inviteCodes'})
            //if no error fecthing the document
            if(!codesDocument.error){
                //get encrypted codes array from document
                const encryptedCodesArray = Object.keys(codesDocument)
                //loop through and see if code exists
                for(let encryptedCode of encryptedCodesArray){
                    if(UtilsEncryption.decrypt(encryptedCode) == code){
                        return { exists: true, userKey: codesDocument[encryptedCode] }
                    }
                }
                //if code does not exist return false
                return { exists: false }
            }else{
                return {error: codesDocument.error}
            }
        }catch(error){
            return {error: error}
        }
    },
    addCodeToConfig: async function(payload){
        const { encryptedCode, userKey } = payload
        try{
            //add the code as key with userkey as value
            const response  = await UtilsFirestore.updateDocumentByKey({key: 'inviteCodes', currentCollection: 'config', data: {[encryptedCode]: userKey}})
            if(response.error){
                return {error: response.error}
            }else {
                return response
            }
        }catch(error){
            return {error: error.message}
        }
    }
}

export default UtilsCodeManagement