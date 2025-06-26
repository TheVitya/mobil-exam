import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"

export default function MenuScreen() {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("menu")}</Text>
      <Text style={styles.label}>{t("selectLanguage")}</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.button, language === "en" && styles.selected]}
          onPress={() => changeLanguage("en")}
        >
          <Text style={styles.buttonText}>{t("english")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === "hu" && styles.selected]}
          onPress={() => changeLanguage("hu")}
        >
          <Text style={styles.buttonText}>{t("hungarian")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  languageRow: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  selected: {
    backgroundColor: "#4338ca",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
}) 