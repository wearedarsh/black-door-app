//constants
import Constants from 'expo-constants'
//expo crypto
import * as Crypto from 'expo-crypto';
//key
const salt = Constants.expoConfig.extra.SALT

export default UtilsEncryption = {
    //encrypt: function(string){
        //const encryptedString = CryptoJS.AES.encrypt(string, key).toString()
        //return encryptedString
    //},
    //decrypt: function(string){
        //const bytes = CryptoJS.AES.decrypt(string, key)
        //const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
        //return decryptedString
    //},
    returnHashedString: async function(string){
        const saltString = string + salt
        const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512,saltString)
        const hashedString = hash.toString()
        return hashedString
    }
}