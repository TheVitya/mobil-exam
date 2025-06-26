import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function Input({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  labelStyle,
  error,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    inputContainer: {
      marginBottom: SPACING_UNIT * 2,
    },
    inputLabel: {
      fontSize: 16,
      marginBottom: SPACING_UNIT,
      color: colors.textColor,
      fontWeight: '500',
    },
    textInput: {
      height: 48,
      borderColor: error ? '#ef4444' : colors.textColorSecondary,
      borderWidth: 1,
      borderRadius: SPACING_UNIT,
      paddingHorizontal: SPACING_UNIT * 1.5,
      backgroundColor: colors.cardColor,
      color: colors.textColor,
      fontSize: 16,
    },
    errorText: {
      color: '#ef4444',
      fontSize: 14,
      marginTop: SPACING_UNIT * 0.5,
    },
  })

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.textInput, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textColorSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
} 