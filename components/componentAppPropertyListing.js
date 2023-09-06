import React from 'react'
import { View, Touchable, ImageBackground, Text, StyleSheet, Platform, Dimensions  } from 'react-native'
//styles
import { colors } from '../assets/style/theme'
import { Ionicons } from '@expo/vector-icons'
//components
import ComponentAppBtnPrimary from '../components/componentAppBtnPrimary'

const ComponentAppPropertyListing = (props) => {
    
    const { onPress = () => {}, cta = 'CTA PROP', title = 'SET TITLE PROP', image = 'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location = 'SET LOCATION PROP', size = 'SET SIZE PROP', heightPercent=100 } = props
    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width
    const height = (windowHeight/100 * heightPercent) - 80
    return (
        <View style={{...styles.wrapper, height: height, width: windowWidth}}>
            <ImageBackground source={{uri: image}} style={{...styles.backgroundImage}}>
                <View intensity={24} style={styles.info}>
                    <Text style={{...styles.textContent, textAlign: 'center'}}>{title}</Text>
                </View>
                <View intensity={24} style={styles.info}>
                        <Ionicons style={styles.infoIcon} name={'map-outline'} size={24} color={colors.white} />
                        <Text style={styles.textContent}>{location}</Text>
                </View>
                <View intensity={24} style={styles.info}>
                    <Ionicons style={styles.infoIcon} name={'resize'} size={24} color={colors.white} />
                    <Text style={styles.textContent}>{size}</Text>
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
        backgroundColor:'red',
        width:'100%'
    },
    backgroundImage: {
        flex:1,
        justifyContent: 'flex-end',
        width:'100%', 
        backgroundColor: colors.slate
    },
    info: {
        flexDirection: 'row',
        marginBottom: 16,
        marginHorizontal: 32,
        padding:12,
        backgroundColor: 'rgba(35, 31, 32, 0.7)'
    },
    btnHolder: {
        marginHorizontal: 32,
        marginBottom: 32
    },
    textContent: {
        fontFamily: 'primary-medium',
        fontSize: 16,
        color: colors.white,
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
    infoIcon:{
        marginRight:8
    }
})

export default ComponentAppPropertyListing