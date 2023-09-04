import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppLogoGradient from '../../components/componentAppLogoGradient';
import ComponentAppPropertyListing from '../../components/componentAppPropertyListing';


const DATA = {
    id:0,
    id:1,
    id:2
}


const ScreenAppHome = () => {
    return(
        <View style={styles.container}>
            <ComponentAppLogoGradient />
            <ComponentAppPropertyListing />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppHome