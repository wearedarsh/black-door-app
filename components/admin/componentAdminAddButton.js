import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons'
//styles
import { colors } from '../../assets/style/theme'

const ComponentAdminAddButton = (props) => {
    const { onPress = null } = props
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name='person-add' size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.slate,
        width: 48,
        height: 48,
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999999
    }
});

export default ComponentAdminAddButton;