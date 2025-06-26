import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import { Button, StyleSheet } from "react-native"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedView from "../components/Themed/ThemedView"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles } from "../styles"

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { user, logout } = useUser()
  const navigation = useNavigation()
  const { colors } = useTheme()

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
      color: colors.textColorSecondary,
      marginTop: 8,
    },
    value: {
      fontSize: 18,
      color: colors.textColor,
      fontWeight: "500",
    },
    logoutButtonContainer: {
      marginTop: 24,
      width: "100%",
      alignSelf: "center",
    },
  })

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>{t("profile")}</ThemedText>
      <ThemedView style={styles.infoBox}>
        <ThemedText style={styles.label}>{t("name")}</ThemedText>
        <ThemedText style={styles.value}>{user.name}</ThemedText>
        <ThemedText style={styles.label}>{t("emailLabel")}</ThemedText>
        <ThemedText style={styles.value}>{user.email}</ThemedText>
        <ThemedText style={styles.label}>{t("creator")}</ThemedText>
        <ThemedText style={styles.value}>Nagy Viktor 26224104</ThemedText>
        <ThemedView style={styles.logoutButtonContainer}>
          <Button
            title={t("logout")}
            onPress={() => {
              logout()
              navigation.reset({ index: 0, routes: [{ name: ROUTES.LOGIN }] })
            }}
            color={colors.primary}
          />
        </ThemedView>
      </ThemedView>
    </ThemedSafeAreaView>
  )
} 