import React from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppTitle from '../../components/componentAppTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
//utils
import UtilsSecureStorage from '../../utils/utilsSecureStorage'
import UtilsFirebaseAuth from '../../utils/utilsFirebaseAuth'
//redux
import { removeUserAuth } from '../../redux/actions/actionUserAuth'
import { setLoading } from '../../redux/actions/actionLoading'
import { useDispatch, useSelector } from 'react-redux'

const ScreenAppSettings = () => {
    //redux
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loadingState.loading)
    //log out function
    const logOut = async () => {
        dispatch(setLoading({loading: true}))
        //remove from securestorage
        await UtilsSecureStorage.removeFromSecureStorage({ key: 'authToken'})
        await UtilsSecureStorage.removeFromSecureStorage({ key: 'authDoc'})
        await UtilsSecureStorage.removeFromSecureStorage({ key: 'authIsAdmin'})
        //clear state
        dispatch(setLoading({loading: false}))
        dispatch(removeUserAuth())
        //log out auth
        UtilsFirebaseAuth.signOutAuthUser()

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
        backgroundColor: colors.slate,
    }
})

export default ScreenAppSettings