import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
//components
import ComponentCodeEntry from '../../components/componentCodeEntry'
import ComponentLogo from '../../components/componentLogo'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
//style
import { colors } from '../../assets/style/theme'


const ScreenOnboardEnterCode = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <View style={{flex:2}}>
                    <View style={{marginTop:64}}>
                        <ComponentBackButton onPress={() => {navigation.navigate('ScreenOnboardHome')}} />
                        <ComponentLogo />
                    </View>
                </View>
                <View style={{flex:8, justifyContent: 'flex-start'}}>
                    <ComponentHeroTitle title="ENTER YOUR VIP ACCESS CODE" style={{marginVertical:48}} />
                    {/* <Text style={{...styles.hero,marginVertical:48}}>ENTER YOUR VIP ACCESS CODE</Text> */}
                    <ComponentCodeEntry/>
                </View>
                <View style={{height:80, backgroundColor:colors.gold, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="VERIFY CODE" onPress={()=>{navigation.navigate('ScreenOnboardCheckDetails')}} />  
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: colors.slate,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hero: {
        fontFamily: 'primary-regular',
        fontSize: 24,
        color: colors.white,
        textAlign: 'center',
        letterSpacing: 8,
        paddingLeft: 8
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    }
})

export default ScreenOnboardEnterCode