import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppCarousel from '../../components/componentAppCarousel'
import ComponentAppLogoGradient from '../../components/componentAppLogoGradient'

const ScreenAppPropertyView = () => {
    const data=[
        0,
        2,
        3,
        4
    ]
    return(
        <View style={styles.container}>
            <ComponentAppLogoGradient />
            <ComponentAppCarousel data={data} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppPropertyView