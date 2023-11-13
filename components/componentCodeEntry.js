import React, { useState } from 'react'
import {View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
//style
import { colors } from '../assets/style/theme'
//components
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';



const ComponentCodeEntry = (props) => {
    const { codeLength = 4, codeValue = '', setCodeValue = () => {}, fulfillFunction = () => {} } = props
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({value, cellCount: codeLength});
    const [propsForClearFocusCell, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleFulfill = (code) => {
      if(code.length === codeLength){
        Keyboard.dismiss
       fulfillFunction(code)
      }
    }
    

    return (
          <CodeField
          ref={ref}
          {...propsForClearFocusCell}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={(code) => {
            setValue(code)
            handleFulfill(code)
            }
          }
          cellCount={codeLength}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"

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
    container: {
      flex: 1,
    },
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
        color: colors.white,
        justifyContent: 'center'
      }
})

export default ComponentCodeEntry