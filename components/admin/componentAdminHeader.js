import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentBackButton from '../componentBackButton'
import ComponentAdminLogo from './componentAdminLogo';


const ComponentAdminHeader = (props) => {
    const { backButton = false, onPress = () => {}} = props
    return (
            <View style={styles.wrapper}>
                {backButton && <ComponentBackButton onPress={onPress} /> }
                <ComponentAdminLogo />

            </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: colors.secondary,
        height:Platform.OS === 'ios' ? 100 : 80,
        justifyContent:'flex-end',
        paddingBottom:16
    }

});

export default ComponentAdminHeader;    