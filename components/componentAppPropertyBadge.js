import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
//styles
import { colors } from '../assets/style/theme'

const ComponentAppPropertyBadge = (props) => {
  const { title = 'SET TITLE PROP' } = props
  return (
        <View style={styles.wrapper}>
            <Text style={styles.badgeTitle}>
              {title}
            </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
    padding:8,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  badgeTitle: {
    color: colors.gold,
    fontFamily: 'primary-medium',
    textAlign:'center',
    fontSize: 16,
    letterSpacing: 3,
    paddingLeft: Platform.OS === 'ios' ? 3 : 0,
  }
});

export default ComponentAppPropertyBadge;