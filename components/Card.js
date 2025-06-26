import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function Card({ 
  children, 
  style, 
  padding = SPACING_UNIT * 2,
  marginBottom = SPACING_UNIT * 2,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    card: {
      backgroundColor: colors.cardColor,
      borderRadius: SPACING_UNIT * 1.5,
      padding: padding,
      marginBottom: marginBottom,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  })

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  )
} 