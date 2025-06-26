import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function Badge({ 
  text, 
  color, 
  size = 'medium',
  style,
  textStyle,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    badge: {
      paddingHorizontal: SPACING_UNIT * 1.5,
      paddingVertical: SPACING_UNIT * 0.75,
      borderRadius: SPACING_UNIT * 2,
      backgroundColor: color || colors.primary,
    },
    badgeSmall: {
      paddingHorizontal: SPACING_UNIT,
      paddingVertical: SPACING_UNIT * 0.5,
      borderRadius: SPACING_UNIT * 1.5,
    },
    badgeLarge: {
      paddingHorizontal: SPACING_UNIT * 2,
      paddingVertical: SPACING_UNIT,
      borderRadius: SPACING_UNIT * 2.5,
    },
    badgeText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textColorTertiary,
      textAlign: "center",
      textTransform: "capitalize",
    },
    badgeTextSmall: {
      fontSize: 12,
    },
    badgeTextLarge: {
      fontSize: 16,
    },
  })

  const getBadgeStyle = () => {
    if (size === 'small') return [styles.badge, styles.badgeSmall, style]
    if (size === 'large') return [styles.badge, styles.badgeLarge, style]
    return [styles.badge, style]
  }

  const getTextStyle = () => {
    if (size === 'small') return [styles.badgeText, styles.badgeTextSmall, textStyle]
    if (size === 'large') return [styles.badgeText, styles.badgeTextLarge, textStyle]
    return [styles.badgeText, textStyle]
  }

  return (
    <View style={getBadgeStyle()} {...props}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  )
} 