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
                        return codesDocument[encryptedCode]
                    }
                }
                //if code does nto exist return false
                return false
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
                const response  = await UtilsFirestore.setDocument({key: 'inviteCodes', currentCollection: 'config', data: {codes: updatedCodesArray}})
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