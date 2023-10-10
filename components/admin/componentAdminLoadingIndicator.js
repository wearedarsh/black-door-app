import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'


const ComponentAdminLoadingIndicator = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.gold} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: 400
    }
})

export default ComponentAdminLoadingIndicator