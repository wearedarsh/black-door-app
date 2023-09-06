import React from 'react'
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppCarousel from '../../components/componentAppCarousel'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppIconCopy from '../../components/componentAppIconCopy'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'

const ScreenAppPropertyView = ({ navigation }) => {
    const data=[0,2,3,4]
    return(
        <>
        <ComponentAppBrandingHeader gradient={true} backButton={true} onPress={()=>{navigation.navigate('ScreenAppHome')}} />
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container}>
                <ComponentAppCarousel data={data} heightPercent={60} />
                
                <View style={styles.content}>
                    <Text style={{...styles.header}}>PENTHOUSE APARTMENT DOWNTOWN VIEWS</Text>
                    <Text style={{...styles.copy}}>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. INTEGER TINCIDUNT LIGULA DUI, NON LOBORTIS JUSTO VENENATIS VEL. SED NISL PURUS, CURSUS SED VENENATIS IN</Text>
                    <ComponentAppIconCopy icon={'map-outline'} copy={'NYC'} marginTop={32} />
                    <ComponentAppIconCopy icon={'resize-outline'} copy={'3,000 SQ FT'} />
                    <ComponentAppIconCopy icon={'cash-outline'} copy={'20M USD'} />
                    <ComponentAppBtnPrimary label={'SPEAK TO AGENT'} onPress={()=>{}} marginTop={32} />
                    <ComponentAppBtnSecondary icon={false} label={'DOWNLOAD FLOORPLAN'} />
                </View>
            </ScrollView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate,
    },
    wrapper: {
        backgroundColor: colors.slate
    },
    content: {
        padding: 32
    },
    header: { 
        color: colors.white,
        fontFamily: 'primary-medium',
        fontSize:21,
        textAlign: 'center',
        marginBottom: 32, 
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
    copy: {
        color: colors.white,
        fontFamily:'primary-regular',
        textAlign: 'center',
        fontSize:12,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    }

})

export default ScreenAppPropertyView