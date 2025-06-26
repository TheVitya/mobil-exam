import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import { useUser } from "../providers/UserProvider"

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { user } = useUser()
  console.log(user)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("profile")}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>{t("name")}</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.label}>{t("emailLabel")}</Text>
        <Text style={styles.value}>{user.email}</Text>
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
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "500",
  },
}) 