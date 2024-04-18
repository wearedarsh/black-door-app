import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
//styles
import { colors, brand } from '../../assets/style/theme'

const ComponentAdminLogo = (props) => {
    const { headline = brand.logoHeadline, strapline = brand.logoStraplineAdmin } = props
    return(
        <View style={styles.container}>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.strapline}>{strapline}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    headline: {
        color: colors.primary,
        fontSize: 32,
        letterSpacing: 6,
        paddingLeft:Platform.OS === 'ios' ? 6 : 0,
        lineHeight: 32,
        fontFamily: 'hero'
    },
    strapline: {
        color: colors.primary,
        fontSize: 12,
        letterSpacing: 16,
        paddingLeft:Platform.OS === 'ios' ? 16 : 0,
        fontFamily: 'hero'
    }
})

export default ComponentAdminLogo