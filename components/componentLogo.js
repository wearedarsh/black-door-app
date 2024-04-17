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
        alignItems: 'center',
    },
    headline: {
        color: colors.gold,
        fontSize: 40,
        letterSpacing: 4,
        paddingLeft:Platform.OS === 'ios' ? 4 : 0,
        lineHeight: 40,
        fontFamily: 'hero'
    },
    strapline: {
        color: colors.gold,
        fontSize: 16,
        letterSpacing: 8,
        paddingLeft:Platform.OS === 'ios' ? 8 : 0,
        fontFamily: 'hero'
    }
})

export default ComponentLogo