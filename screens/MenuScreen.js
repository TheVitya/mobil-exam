import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"

export default function MenuScreen() {
  const { t, i18n } = useTranslation()
  const { language, setPreferredLanguage } = useUser()
  const { theme, toggleTheme, colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 24,
      color: colors.textColor,
    },
    label: {
      fontSize: 18,
      marginBottom: 16,
      color: colors.textColorSecondary,
    },
    languageRow: {
      flexDirection: "row",
      gap: 16,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginHorizontal: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    selected: {
      color: colors.textColorTertiary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textColor,
    },
  })

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setPreferredLanguage(lang)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("menu")}</Text>
      <Text style={styles.label}>{t("selectLanguage")}</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.button, language === "en" && styles.selected, { backgroundColor: language === "en" ? colors.primary : colors.cardColor }]}
          onPress={() => changeLanguage("en")}
        >
          <Text style={[styles.buttonText, language === "en" && styles.selected]}>{t("english")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === "hu" && styles.selected, { backgroundColor: language === "hu" ? colors.primary : colors.cardColor }]}
          onPress={() => changeLanguage("hu")}
        >
          <Text style={[styles.buttonText, language === "hu" && styles.selected]}>{t("hungarian")}</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.label, { marginTop: 32 }]}>{t("colorScheme") || "Color Scheme"}</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.button, theme === "light" && styles.selected, { backgroundColor: theme === "light" ? colors.primary : colors.cardColor }]}
          onPress={() => theme !== "light" && toggleTheme()}
        >
          <Text style={[styles.buttonText, theme === "light" && styles.selected]}>{t("light") || "Light"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, theme === "dark" && styles.selected, { backgroundColor: theme === "dark" ? colors.primary : colors.cardColor }]}
          onPress={() => theme !== "dark" && toggleTheme()}
        >
          <Text style={[styles.buttonText, theme === "dark" && styles.selected]}>{t("dark") || "Dark"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
} 