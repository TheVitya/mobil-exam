import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThemedSafeAreaView({ style, ...props }) {
  return <SafeAreaView style={style} {...props} />;
} 