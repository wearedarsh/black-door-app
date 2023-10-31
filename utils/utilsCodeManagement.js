import UtilsFirestore from './utilsFirestore'
import UtilsEncryption from './utilsEncryption'

const UtilsCodeManagement = {
    checkCodeExists: async function(payload){
        const { code } = payload
        //encrypt code
        const encryptedCode = UtilsEncryption.encrypt(code)
        try{
            //get codes config document from firestore
            const codesDocument = await UtilsFirestore.getDocumentByKey({currentCollection: 'config', key: 'inviteCodes'})
            //if no error fecthing the document
            if(!codesDocument.error){
                //get encrypted codes array from document
                const codes = codesDocument.codes
                //check if encrypted code exists in encrypted array
                if(codes.includes(encryptedCode)){
                    return true
                }else{
                    return false
                }
            }else{
                return {error: codesDocument.error}
            }
        }catch(error){
            return {error: error.message}
        }
    },
    addCodeToConfig: async function(payload){
        const { code } = payload
        //encrypt code
        const encryptedCode = UtilsEncryption.encrypt(code)
        try{
            //get codes config document from firestore
            const codesDocument = await UtilsFirestore.getDocumentByKey({currentCollection: 'config', key: 'inviteCodes'})
            if(!codesDocument.error){
                //get encrypted codes array from document
                const codes = codesDocument.codes
                //add code to codesArray
                const updatedCodesArray = [...codes, encryptedCode]
                //set the codes array on firestore
                const response  = await UtilsFirestore.setDocument({key: 'inviteCodes', collection: 'config', data: {codes: updatedCodesArray}})
                if(response.error){
                    return {error: response.error}
                }else {
                    return response
                }
            }else{
                return {error: codesDocument.error}
            }
        }catch(error){
            return {error: error.message}
        }
    }
}

export default UtilsCodeManagement