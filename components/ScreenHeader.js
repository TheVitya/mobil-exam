import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function ScreenHeader({ 
  title, 
  subtitle, 
  icon,
  style,
  titleStyle,
  subtitleStyle,
  iconStyle,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    header: {
      marginBottom: SPACING_UNIT * 3.75,
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.textColor,
      marginBottom: SPACING_UNIT,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.textColorSecondary,
      textAlign: "center",
    },
    icon: {
      fontSize: 32,
      marginBottom: SPACING_UNIT,
    },
  })

  return (
    <View style={[styles.header, style]} {...props}>
      {icon && <Text style={[styles.icon, iconStyle]}>{icon}</Text>}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
    </View>
  )
} 