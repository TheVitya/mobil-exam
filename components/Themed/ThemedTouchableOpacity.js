import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function ThemedTouchableOpacity({ style, ...props }) {
  return <TouchableOpacity style={style} {...props} />;
} 