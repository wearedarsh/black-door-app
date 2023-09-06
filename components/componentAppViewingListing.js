import React from 'react'
import { View, StyleSheet } from 'react-native'
//style
import { colors } from '../assets/style/theme'
//components
import ComponentHeroTitle from '../components/componentHeroTitle'
import ComponentAppIconCopy from '../components/componentAppIconCopy'
import ComponentAppBtnPrimary from '../components/componentAppBtnPrimary'


const ComponentAppViewingListing = (props) => {
    const {title = 'SET TITLE PROP', date =  'SET DATE PROP', time = 'SET TIME PROP', address = 'SET ADDRESS PROP', onPress = () => {} } = props
    return(
        <View style={styles.wrapper}>
            <ComponentHeroTitle style={{marginBottom: 16, fontSize: 20, fontFamily: 'primary-medium'}} title={title} />
            <ComponentAppIconCopy iconName={'ios-today-sharp'} copy={date} />
            <ComponentAppIconCopy iconName={'time-outline'} copy={time} />
            <ComponentAppIconCopy icon={false} copy={address} />
            <ComponentAppBtnPrimary label={'VIEW ON MAPS'} icon={true} iconName={'map-outline'} onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width:'100%',
        borderWidth: 2,
        borderColor: colors.white,
        padding:16,
        marginTop: 24

    },
})

export default ComponentAppViewingListing