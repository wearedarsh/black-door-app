import React from 'react'
import { Text, View, Platform, StyleSheet} from 'react-native'
//styles
import { colors } from '../assets/style/theme'

const ComponentHeroTitle = (props) => {

    const { title = 'SET TITLE PROP', style } = props
    return(
        <View>
            <Text style={{...styles.hero, ...style}}>{title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    hero: {
        fontFamily: 'primary-regular',
        fontSize: 24,
        color: colors.white,
        textAlign: 'center',
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    }
})

export default ComponentHeroTitle