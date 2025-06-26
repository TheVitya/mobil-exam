import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedTouchableOpacity from "../components/Themed/ThemedTouchableOpacity"
import ThemedView from "../components/Themed/ThemedView"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles } from "../styles"

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
      borderRadius: 8,
      marginHorizontal: 8,
    },
    selected: {
      // backgroundColor handled inline
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
  })

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setPreferredLanguage(lang)
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>{t("menu")}</ThemedText>
      <ThemedText style={styles.label}>{t("selectLanguage")}</ThemedText>
      <ThemedView style={styles.languageRow}>
        <ThemedTouchableOpacity
          style={[styles.button, language === "en" && styles.selected, { backgroundColor: language === "en" ? colors.primary : colors.cardColor }]}
          onPress={() => changeLanguage("en")}
        >
          <ThemedText style={[styles.buttonText, { color: colors.textColorTertiary }]}>{t("english")}</ThemedText>
        </ThemedTouchableOpacity>
        <ThemedTouchableOpacity
          style={[styles.button, language === "hu" && styles.selected, { backgroundColor: language === "hu" ? colors.primary : colors.cardColor }]}
          onPress={() => changeLanguage("hu")}
        >
          <ThemedText style={[styles.buttonText, { color: colors.textColorTertiary }]}>{t("hungarian")}</ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>
      <ThemedText style={[styles.label, { marginTop: 32 }]}>{t("colorScheme") || "Color Scheme"}</ThemedText>
      <ThemedView style={styles.languageRow}>
        <ThemedTouchableOpacity
          style={[styles.button, theme === "light" && styles.selected, { backgroundColor: theme === "light" ? colors.primary : colors.cardColor }]}
          onPress={() => theme !== "light" && toggleTheme()}
        >
          <ThemedText style={[styles.buttonText, { color: colors.textColorTertiary }]}>{t("light") || "Light"}</ThemedText>
        </ThemedTouchableOpacity>
        <ThemedTouchableOpacity
          style={[styles.button, theme === "dark" && styles.selected, { backgroundColor: theme === "dark" ? colors.primary : colors.cardColor }]}
          onPress={() => theme !== "dark" && toggleTheme()}
        >
          <ThemedText style={[styles.buttonText, { color: colors.textColorTertiary }]}>{t("dark") || "Dark"}</ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>
    </ThemedSafeAreaView>
  )
} 