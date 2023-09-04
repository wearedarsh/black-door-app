import React, { useState } from 'react'
import {View, Text, StyleSheet } from 'react-native'
//style
import { colors } from '../assets/style/theme'
//components
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';



const ComponentCodeEntry = () => {
    const codeLength = 4
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({value, cellCount: codeLength});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    

    return (
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={codeLength}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.codeInputCell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        paddingHorizontal: 32
    },
    codeInputCell: {
        borderWidth: 2,
        borderColor: colors.white,
        width: 48,
        height: 48,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'primary-regular',
        color: colors.white
      }
})

export default ComponentCodeEntry