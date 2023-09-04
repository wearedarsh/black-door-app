import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
//styles
import { colors, brand } from '../assets/style/theme'

const ComponentLogo = (props) => {
    const { headline = brand.logoHeadline, strapline = brand.logoStrapline } = props
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
        color: colors.gold,
        fontSize: 48,
        letterSpacing: 12,
        paddingLeft:Platform.OS === 'ios' ? 12 : 0,
        lineHeight: 48,
        fontFamily: 'hero'
    },
    strapline: {
        color: colors.gold,
        fontSize: 16,
        letterSpacing: 32,
        paddingLeft:Platform.OS === 'ios' ? 32 : 0,
        fontFamily: 'hero'
    }
})

export default ComponentLogo