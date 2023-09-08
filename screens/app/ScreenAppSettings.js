import React from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppTitle from '../../components/componentAppTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'

const ScreenAppSettings = () => {
    return(
        <>
            <ComponentAppBrandingHeader />
            <View style={styles.container}>
            <ComponentAppTitle title={'SETTINGS'} />
                
                <View style={styles.form}>
                    <ComponentAppBtnPrimary  label="CHANGE PASSWORD" iconName={'exit-outline'} />
                    <ComponentAppBtnSecondary  label="LOG OUT" iconName={'exit-outline'} />
                    
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