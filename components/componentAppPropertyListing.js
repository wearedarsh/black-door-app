import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Platform, Dimensions  } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
import { Ionicons } from '@expo/vector-icons'
//components
import ComponentAppBtnPrimary from '../components/componentAppBtnPrimary'
import ComponentAppPropertyBadge from './componentAppPropertyBadge'

const ComponentAppPropertyListing = (props) => {
    
    const { onPress = () => {}, cta = 'CTA PROP', title = 'SET TITLE PROP', image = 'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location = 'SET LOCATION PROP', size = 'SET SIZE PROP', heightPercent=100, badge = 'under offer', marginBottom=0, convertDateToDisplay= () => {}} = props
    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width
    const smallScreenAdjust = windowHeight < 600 ? 200 : 0
    const height = (windowHeight/100 * heightPercent) - 100 + smallScreenAdjust//bottom tabs are 100
    

    return (
        <View style={{...styles.wrapper, height: height, width: windowWidth, marginBottom: marginBottom}}>
            <ImageBackground source={{uri: image}} style={{...styles.backgroundImage}}>
                {badge && <View style={{position:'absolute', top:16, left:16}}><ComponentAppPropertyBadge title={badge.toUpperCase()} /></View>}
                <View style={styles.info}>
                    <Text style={{...styles.textContent, textAlign: 'left'}}>{title}</Text>
                </View>
                <View style={styles.info}>
                        <Ionicons style={styles.infoIcon} name={'map-outline'} size={24} color={colors.white} />
                        <Text style={styles.textContent}>{location}</Text>
                </View>
                
                <View style={styles.btnHolder}>
                    <ComponentAppBtnPrimary label={cta} onPress={onPress} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width:'100%',
    },
    backgroundImage: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width:'100%', 
        backgroundColor: colors.slate,


    },
    info: {
        flexDirection: 'row',
        marginBottom: 16,
        padding:12,
        backgroundColor: 'rgba(35, 31, 32, 0.7)',
        width:'90%'
    },
    btnHolder: {
        marginHorizontal: 32,
        marginBottom: 32,
        width:'90%'
    },
    textContent: {
        fontFamily: 'primary-medium',
        fontSize: 16,
        color: colors.white,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    },
    infoIcon:{
        marginRight:8
    }
})

export default ComponentAppPropertyListing