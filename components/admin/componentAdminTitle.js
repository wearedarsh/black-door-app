import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminTitle = (props) => {
    const { title = 'SET TITLE PROP' } = props
    return (
        <>
            <Text style={styles.title}>{title}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        width:'100%',
        fontSize: 16,
        color: colors.white,
        backgroundColor: colors.secondary,
        fontFamily: 'primary-medium',
        textAlign:'center',
        padding:4,
        paddingBottom: 16,
        letterSpacing: 4,
        paddingLeft: Platform.OS === 'ios' ? 4 : 0
      }
});

export default ComponentAdminTitle;