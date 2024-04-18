import React from 'react'
import {View, Image, StyleSheet, Text } from 'react-native'
import {colors } from '../assets/style/theme'

const ComponentAppCarouselSlide = (props) => {
    const { image, windowWidth } = props
    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={{...styles.image, width: windowWidth}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.secondary
    },
    image: {
        height:'100%'
    }
})

export default ComponentAppCarouselSlide