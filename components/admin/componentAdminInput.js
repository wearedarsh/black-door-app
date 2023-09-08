import React from 'react';
import { StyleSheet, Text, TextInput, Platform } from 'react-native'
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminInput = (props) => {
    const { label = 'SET LABEL PROP', placeholder = 'Set placeholder prop...'} = props
    return (
            <>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder} />
            </>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: 'primary-bold',
        color: colors.gold,
        textAlign: 'center',
        width:'100%',
        marginBottom: 8,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    },
    input: {
        borderWidth:1,
        borderColor:colors.slate,
        width:'100%',
        height:48,
        paddingHorizontal: 16,
        color: colors.slate,
        fontSize: 16,
        fontFamily: 'primary-medium',
        marginBottom: 16

    }
});

export default ComponentAdminInput;