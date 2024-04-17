import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Platform, Dimensions, Image } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
import { Ionicons } from '@expo/vector-icons'
//components
import ComponentAppBtnPrimary from '../components/componentAppBtnPrimary'
import ComponentAppPropertyBadge from './componentAppPropertyBadge'

const ComponentAppHomeWelcome = (props) => {
    
    const { onPress = () => {}, cta = 'CTA PROP', addHeightForSmallScreens = 0, title = 'SET TITLE PROP', image = 'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location = 'SET LOCATION PROP', size = 'SET SIZE PROP', heightPercent=100, badge = 'under offer', value = 'ADD VALUE PROP', marginBottom=0, convertDateToDisplay= () => {}} = props
    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width
    const height = (windowHeight/100 * heightPercent) - 80 //bottom tabs are 100
    
    return (
        <View style={{...styles.wrapper, height: height, width: windowWidth, marginBottom: marginBottom}}>
            <ImageBackground source={require('../assets/img/welcome-screen-bgr.png')} style={{...styles.backgroundImage}}>
                {/* {badge && <View style={{position:'absolute', top:16, left:16}}><ComponentAppPropertyBadge title={badge.toUpperCase()} /></View>} */}
                <View style={styles.info}>
                    <Text style={{...styles.textContent, textAlign: 'center'}}>{title}</Text>
                </View>

                
                <View style={styles.btnHolder}>
                    <ComponentAppBtnPrimary label={cta} onPress={onPress} marginTop={16} />
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
    row: {
        flexDirection: 'row'
    },
    info: {
        flexDirection: 'row',
        marginBottom: 16,
        padding:12,
        backgroundColor: 'rgba(35, 31, 32, 0.7)',
        width:'90%',
        justifyContent: 'center'
 
    },
    btnHolder: {
        marginHorizontal: 32,
        marginBottom: 32,
        width:'90%'
    },
    textContent: {
        fontFamily: 'primary-regular',
        fontSize: 16,
        color: colors.white,
        letterSpacing: 1,
        paddingLeft: Platform.OS === 'ios' ? 1 : 0,
    },
    infoIcon:{
        marginRight:8
    }
})

export default ComponentAppHomeWelcome