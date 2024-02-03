import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
//style
import { colors } from '../../assets/style/theme'

const ComponentAdminParagraph = (props) => {
    const { copy = 'SET COPY PROP', textAlign = 'left', fontSize = 12, color = colors.slate, paddingBottom = 16} = props
    return (
        <>
            <Text style={{...styles.paragraph, textAlign, fontSize, color, paddingBottom}}>{copy.toUpperCase()}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    paragraph: {
        width:'100%',
        color: colors.white,
        fontFamily: 'primary-medium',
        textAlign:'center',
        letterSpacing: 2,
        paddingLeft: Platform.OS === 'ios' ? 2 : 0
      }
});

export default ComponentAdminParagraph