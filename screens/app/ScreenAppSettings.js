import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppTitle from '../../components/componentAppTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentOnboardToggle from '../../components/componentOnboardToggle'
//utils
import UtilsSecureStorage from '../../utils/utilsSecureStorage'
import UtilsFirebaseAuth from '../../utils/utilsFirebaseAuth'
import UtilsAuthentication from '../../utils/utilsAuthentication'
//redux
import { removeUserAuth } from '../../redux/actions/actionUserAuth'
import { useDispatch, useSelector } from 'react-redux'

const ScreenAppSettings = () => {
    //redux
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [pushOptIn, setPushOptIn] = useState()
    
    //log out function
    const logOut = async () => {
        setLoading(true)
        const response = await UtilsAuthentication.logoutUser({dispatch})
        setLoading(false)
    }

    return(
        <>
            <ComponentAppBrandingHeader />
            <View style={styles.container}>
            <ComponentAppTitle title={'SETTINGS'} />
                <View style={styles.form}>
                    <ComponentAppBtnPrimary  label="CHANGE PASSWORD" onPress={()=>{}} />
                    <ComponentAppBtnSecondary  label="LOG OUT" iconName={'exit-outline'} onPress={logOut} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 32, 
        width:'100%',
        flex:1,
        justifyContent: 'center'
    },
    container: {
        paddingTop:Platform.OS === 'ios' ? 128 : 100,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
    }
})

export default ScreenAppSettings