import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useTheme } from '../providers/ThemeProvider'
import { createSharedStyles, SPACING_UNIT } from '../styles'

export default function FilterPicker({ 
  label, 
  selectedValue, 
  onValueChange, 
  items, 
  style,
  labelStyle,
  ...props 
}) {
  const { colors } = useTheme()
  const sharedStyles = createSharedStyles(colors)
  
  const styles = StyleSheet.create({
    ...sharedStyles,
    filterContainer: {
      flex: 1,
      marginRight: SPACING_UNIT,
    },
    filterLabel: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 2,
      color: colors.textColor,
    },
    picker: {
      color: colors.textColor,
    },
  })

  return (
    <View style={[styles.filterContainer, style]}>
      {label && <Text style={[styles.filterLabel, labelStyle]}>{label}</Text>}
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor={colors.textColor}
        {...props}
      >
        {items.map((item, index) => (
          <Picker.Item 
            key={index}
            label={item.label} 
            value={item.value} 
          />
        ))}
      </Picker>
    </View>
  )
} 