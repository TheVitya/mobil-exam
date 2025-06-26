import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import i18n from "i18n-js"

// Set up translations
// const translations = {
//   en: { menu: "Menu", selectLanguage: "Select Language", english: "English", hungarian: "Hungarian" },
//   hu: { menu: "Menü", selectLanguage: "Válassz nyelvet", english: "Angol", hungarian: "Magyar" },
// }
// i18n.translations = translations
// i18n.fallbacks = true

export default function MenuScreen() {
  const [language, setLanguage] = useState(i18n.locale)

  const changeLanguage = (lang) => {
    i18n.locale = lang
    setLanguage(lang)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t("menu")}</Text>
      <Text style={styles.label}>{i18n.t("selectLanguage")}</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.button, language === "en" && styles.selected]}
          onPress={() => changeLanguage("en")}
        >
          <Text style={styles.buttonText}>{i18n.t("english")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === "hu" && styles.selected]}
          onPress={() => changeLanguage("hu")}
        >
          <Text style={styles.buttonText}>{i18n.t("hungarian")}</Text>
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