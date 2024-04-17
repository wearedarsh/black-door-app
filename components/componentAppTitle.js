import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
//style
import { colors } from '../assets/style/theme'

const ComponentAppTitle = (props) => {
    const { title = 'SET TITLE PROP' } = props
  return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom:16,
    },
    title: {
        color: colors.white,
        fontFamily: 'primary-medium',
        fontSize: 16,
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
    }
});

export default ComponentAppTitle;