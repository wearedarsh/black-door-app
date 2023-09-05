import React from 'react'
import {View, Image, StyleSheet, Text } from 'react-native'
import {colors } from '../assets/style/theme'

const ComponentAppCarouselSlide = (props) => {
    const { image, windowWidth } = props
    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/demo-property-image.png')} style={{...styles.image, width: windowWidth}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.slate
    },
    image: {
        height:'100%'
    }
})

export default ComponentAppCarouselSlide