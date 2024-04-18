import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, Platform, View } from 'react-native'
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminDateInput = (props) => {
    const { inputRef, label = 'SET LABEL PROP', multiline = false, numberoflines = 1, placeholderDD = 'DD',placeholderMM = 'MM', placeholderYY = 'YY', valueDD = '', valueMM = '', valueYY = '',  onChangeTextDD = null, onChangeTextYY = null, onChangeTextMM = null, height = 48 } = props
    return (
        <View style={{flexDirection:'row', width:'100%', flex: 1, justifyContent:'space-between'}}>
            <View style={styles.dateHolder}>
                <Text style={styles.label}>DD</Text>
                <TextInput ref={inputRef ? inputRef : null} style={{...styles.input, height: height}} placeholder={placeholderDD} value={valueDD} numberoflines={numberoflines} onChangeText={onChangeTextDD} maxLength={2} />
            </View>
            <View style={styles.dateHolder}>
                <Text style={styles.label}>MM</Text>
                <TextInput ref={inputRef ? inputRef : null} style={{...styles.input, height: height}} placeholder={placeholderMM} value={valueMM} numberoflines={numberoflines} onChangeText={onChangeTextMM} maxLength={2} />
            </View>
            <View style={styles.dateHolder}>
                <Text style={styles.label}>YYYY</Text>
                <TextInput ref={inputRef ? inputRef : null} style={{...styles.input, height: height}} placeholder={placeholderYY} value={valueYY} numberoflines={numberoflines} onChangeText={onChangeTextYY} maxLength={4} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: 'primary-regular',
        color: colors.primary,
        textAlign: 'center',
        width:'100%',
        marginBottom: 8,
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    },
    input: {
        borderWidth:1,
        borderColor:colors.secondary,
        height:48,
        paddingHorizontal: 16,
        color: colors.secondary,
        fontSize: 16,
        fontFamily: 'primary-regular',
        marginBottom: 16, 
    },
    dateHolder: {
        width: '25%'
    }
});

export default ComponentAdminDateInput;