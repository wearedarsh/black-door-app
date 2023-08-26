import { initializeApp } from "firebase/app"

import Constants from 'expo-constants'

const FIREBASE_APIKEY = Constants.expoConfig.extra.FIREBASE_APIKEY
const FIREBASE_AUTHDOMAIN = Constants.expoConfig.extra.FIREBASE_AUTHDOMAIN
const FIREBASE_PROJECTID = Constants.expoConfig.extra.FIREBASE_PROJECTID
const FIREBASE_STORAGEBUCKET = Constants.expoConfig.extra.FIREBASE_STORAGEBUCKET
const FIREBASE_MESSAGINGSENDERID = Constants.expoConfig.extra.FIREBASE_MESSAGINGSENDERID
const FIREBASE_APPID = Constants.expoConfig.extra.FIREBASE_APPID
const FIREBASE_MEASUREMENTID = Constants.expoConfig.extra.FIREBASE_MEASUREMENTID


const ConfigFirebase = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID
};

export const app = initializeApp(ConfigFirebase)