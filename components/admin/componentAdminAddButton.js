import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons'
//styles
import { colors } from '../../assets/style/theme'

const ComponentAdminAddButton = (props) => {
    const { onPress = null, title = 'Add title prop' } = props
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <View>
          <Ionicons name='add' size={36} color={colors.white} />
        </View>
        <View>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
          </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.slate,
        height: 48,
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999999,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    title: {
      color: colors.white,
      fontFamily: 'primary-medium'
    }
});

export default ComponentAdminAddButton;