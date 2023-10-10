import React from 'react';
import { StyleSheet, Text, TextInput, Platform } from 'react-native'
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminInput = (props) => {
    const { label = 'SET LABEL PROP', multiline = false, numberoflines = 1, placeholder = 'Set placeholder prop...', value = '',  onChangeText = null, height = 48 } = props
    return (
            <>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={{...styles.input, height: height}} placeholder={placeholder} value={value} numberoflines={numberoflines} onChangeText={onChangeText} multiline={multiline} />
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
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
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