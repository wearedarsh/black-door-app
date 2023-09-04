import React from 'react'
import { Text, View, Platform, StyleSheet} from 'react-native'
//styles
import { colors } from '../assets/style/theme'

const ComponentHeroTitle = (props) => {

    const { title, style } = props
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
        letterSpacing: 8,
        paddingLeft: Platform.OS === 'ios' ? 8 : 0
    }
})

export default ComponentHeroTitle