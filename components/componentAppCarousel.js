import React, { useState } from 'react'
import {FlatList, View, StyleSheet, Dimensions } from 'react-native'
//components
import ComponentAppCarouselBullets from './componentAppCarouselBullets'
import ComponentAppCarouselSlide from './componentAppCarouselSlide'

const ComponentAppCarousel = (props) => {
    const { data, heightPercent } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    const carouselHeight = windowHeight/100 * heightPercent
    return(
        <View style={{...style.container, height: carouselHeight }}>
            <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => <ComponentAppCarouselSlide windowWidth={windowWidth} image={item} />}
            keyExtractor={(item) => item}
            pagingEnabled
            showVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) =>{
                const offset = event.nativeEvent.contentOffset.x
                const index = Math.round(offset / windowWidth)
                setCurrentIndex(index)
            }}
            />

            <ComponentAppCarouselBullets data={data} currentIndex={currentIndex} />

        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
    }
})

export default ComponentAppCarousel