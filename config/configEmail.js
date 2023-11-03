import Constants from 'expo-constants'

const EMAIL_HOST = Constants.expoConfig.extra.EMAIL_HOST
const EMAIL_AUTH_USER = Constants.expoConfig.extra.EMAIL_AUTH_USER
const EMAIL_AUTH_PASS = Constants.expoConfig.extra.EMAIL_AUTH_PASS

const ConfigEmail ={
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_AUTH_USER,
        pass: EMAIL_AUTH_PASS
    }
}

export default ConfigEmail