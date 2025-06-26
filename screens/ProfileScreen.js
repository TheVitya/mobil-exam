import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import { Button, StyleSheet, View, Text } from "react-native"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"

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