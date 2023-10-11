import React from 'react'
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'


const ComponentAdminLoadingIndicator = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.white} style={styles.indicator} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.slate,
        position:'absolute',
        width: '100%',
        height:'100%',
        zIndex: 9,
        elevation: 9
    },
    indicator:{
        //marginTop:Platform.OS === 'ios' ? -100 : -80,
    }
})

export default ComponentAdminLoadingIndicator