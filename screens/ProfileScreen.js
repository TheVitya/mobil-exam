import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUser } from "../providers/UserProvider"
import { colors } from "../styles"
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from "../constants"

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { user, logout } = useUser()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("profile")}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>{t("name")}</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.label}>{t("emailLabel")}</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>{t("creator")}</Text>
        <Text style={styles.value}>Nagy Viktor 26224104</Text>
        <View style={styles.logoutButtonContainer}>
          <Button
            title={t("logout")}
            onPress={() => {
              logout()
              navigation.reset({ index: 0, routes: [{ name: ROUTES.LOGIN }] })
            }}
            color={colors.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  },
  infoBox: {
    backgroundColor: colors.cardColor,
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
  logoutButtonContainer: {
    marginTop: 24,
    width: "100%",
    alignSelf: "center",
  },
}) 