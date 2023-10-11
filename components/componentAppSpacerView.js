import React from 'react';
import { View } from 'react-native';

const ComponentAppSpacerView = (props) => {
    const { height } = props
  return (
<View style={{height:height}}></View>
  );
};


export default ComponentAppSpacerView;