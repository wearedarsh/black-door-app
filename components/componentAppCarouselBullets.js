import React from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../assets/style/theme'

const ComponentAppCarouselBullets = (props) => {
    const { data, currentIndex } = props
    return (
        <View style={styles.container}>
            {data.map((_, index) => <View key={index} style={{...styles.bullet, backgroundColor: index === currentIndex ? colors.white : 'rgba(255, 255, 255, 0.5)'}}></View> )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(35, 31, 32, 0.7)',
        padding: 16,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 32
    },
    bullet: {
        height:8,
        width:8,
        marginHorizontal: 4
    }
})

export default ComponentAppCarouselBullets

