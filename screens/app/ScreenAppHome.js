import React from 'react'
import { View, StyleSheet } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
import ComponentAppPropertyListing from '../../components/componentAppPropertyListing';


const DATA = {
    id:0,
    id:1,
    id:2
}


const ScreenAppHome = ({navigation}) => {
    return(
        <View style={styles.container}>
            <ComponentAppBrandingHeader gradient={true} />
            <ComponentAppPropertyListing onPress={()=> {}} title={'PENTHOUSE APARTMENT'} location={'SF'} cta={'VIEW PROPERTY'} size={'2,450 SQ FT'} badge={'VIP ACCESS'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate,
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppHome