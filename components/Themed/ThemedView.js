import React from 'react';
import { View } from 'react-native';

export default function ThemedView({ style, ...props }) {
  return <View style={style} {...props} />;
} 