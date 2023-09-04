import React from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppLogoGradient from '../../components/componentAppLogoGradient'
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'

const ScreenAppSettings = () => {
    return(
        <View style={styles.container}>
            <ComponentAppLogoGradient />
            <View style={styles.form}>
                <ComponentAppBtnSecondary  label="LOG OUT" icon={'exit-outline'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 32, 
        width:'100%'
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.slate,
    }
})

export default ScreenAppSettings