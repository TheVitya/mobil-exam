import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function DataRow({ 
  label, 
  value, 
  style,
  labelStyle,
  valueStyle,
  marginBottom = SPACING_UNIT,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: marginBottom,
    },
    label: {
      fontSize: 14,
      color: colors.textColorSecondary,
      flex: 1,
      marginRight: SPACING_UNIT,
    },
    value: {
      fontSize: 14,
      color: colors.textColor,
      fontWeight: "400",
      flex: 1,
      textAlign: "right",
    },
  })

  return (
    <View style={[styles.row, style]} {...props}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  )
} 