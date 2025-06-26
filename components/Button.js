import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  style, 
  textStyle,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    button: {
      paddingHorizontal: SPACING_UNIT * 3,
      paddingVertical: SPACING_UNIT * 1.5,
      borderRadius: SPACING_UNIT,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonPrimary: {
      backgroundColor: colors.primary,
    },
    buttonSecondary: {
      backgroundColor: colors.cardColor,
      borderWidth: 1,
      borderColor: colors.textColorSecondary,
    },
    buttonDisabled: {
      backgroundColor: colors.textColorSecondary,
      opacity: 0.5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    buttonTextPrimary: {
      color: colors.textColorTertiary,
    },
    buttonTextSecondary: {
      color: colors.textColor,
    },
    buttonTextDisabled: {
      color: colors.textColorSecondary,
    },
  })

  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.buttonDisabled, style]
    if (variant === 'secondary') return [styles.button, styles.buttonSecondary, style]
    return [styles.button, styles.buttonPrimary, style]
  }

  const getTextStyle = () => {
    if (disabled) return [styles.buttonText, styles.buttonTextDisabled, textStyle]
    if (variant === 'secondary') return [styles.buttonText, styles.buttonTextSecondary, textStyle]
    return [styles.buttonText, styles.buttonTextPrimary, textStyle]
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  )
} 