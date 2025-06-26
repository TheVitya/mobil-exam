import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, ScreenHeader } from "../components"

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
      padding: SPACING_UNIT * 3,
    },
    label: {
      fontSize: 18,
      marginBottom: SPACING_UNIT * 2,
      color: colors.textColorSecondary,
    },
    buttonRow: {
      flexDirection: "row",
      gap: SPACING_UNIT * 2,
      marginBottom: SPACING_UNIT * 4,
    },
  })

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setPreferredLanguage(lang)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={t("menu")} />
      
      <Text style={styles.label}>{t("selectLanguage")}</Text>
      <View style={styles.buttonRow}>
        <Button
          title={t("english")}
          onPress={() => changeLanguage("en")}
          variant={language === "en" ? "primary" : "secondary"}
        />
        <Button
          title={t("hungarian")}
          onPress={() => changeLanguage("hu")}
          variant={language === "hu" ? "primary" : "secondary"}
        />
      </View>
      
      <Text style={styles.label}>{t("colorScheme") || "Color Scheme"}</Text>
      <View style={styles.buttonRow}>
        <Button
          title={t("light") || "Light"}
          onPress={() => theme !== "light" && toggleTheme()}
          variant={theme === "light" ? "primary" : "secondary"}
        />
        <Button
          title={t("dark") || "Dark"}
          onPress={() => theme !== "dark" && toggleTheme()}
          variant={theme === "dark" ? "primary" : "secondary"}
        />
      </View>
    </SafeAreaView>
  )
} 