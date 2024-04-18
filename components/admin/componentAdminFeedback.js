import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
//style
import { colors } from '../../assets/style/theme'
//icons
import { Ionicons } from '@expo/vector-icons'

const ComponentAdminFeedback = (props) => {
    const { title = 'SET TITLE PROP', icon = false } = props
  return (
        <View style={styles.wrapper}>
            { icon && <Ionicons style={styles.feedbackIcon} name={icon} size={24} color={colors.white} /> }
            <Text style={styles.feedbackTitle}>{title.toUpperCase()}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.primary,
        width:'100%',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 32,
        paddingVertical: 16,
        flexDirection: 'row'
    },
    feedbackTitle: {
        color: colors.white,
        fontFamily: 'primary-medium',
        fontSize:16,
        letterSpacing: 3,
        paddingLeft: Platform.OS ? 3 : 0
    },
    feedbackIcon:{
        marginRight: 8
    }
});

export default ComponentAdminFeedback;