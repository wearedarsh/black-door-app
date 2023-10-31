//constants
import Constants from 'expo-constants'
//crypto
import CryptoJS from 'react-native-crypto-js'
//key
const key = Constants.expoConfig.extra.SALT

export default UtilsEncryption = {
    encrypt: function(string){
        const encryptedString = CryptoJS.AES.encrypt(string, key).toString()
        return encryptedString
    },
    decrypt: function(string){
        const bytes = CryptoJS.AES.decrypt(string, key)
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
        return decryptedString
    }
}