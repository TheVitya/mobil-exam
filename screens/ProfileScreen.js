import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View, Text, Image } from "react-native"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card, Button, DataRow, ScreenHeader } from "../components"

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
      padding: SPACING_UNIT * 3,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: SPACING_UNIT * 3,
    },
    infoCard: {
      width: "100%",
      alignItems: "flex-start",
    },
    logoutButtonContainer: {
      marginTop: SPACING_UNIT * 3,
      width: "100%",
    },
  })

  const handleLogout = () => {
    logout()
    navigation.reset({ index: 0, routes: [{ name: ROUTES.LOGIN }] })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/me.jpg")} style={styles.profileImage} />
      
      <Card style={styles.infoCard}>
        <DataRow label={t("name")} value={user.name} />
        <DataRow label={t("emailLabel")} value={user.email} />
        <DataRow label={t("creator")} value="Nagy Viktor 26224104" />
        
        <View style={styles.logoutButtonContainer}>
          <Button 
            title={t("logout")} 
            onPress={handleLogout}
            variant="secondary"
          />
        </View>
      </Card>
    </SafeAreaView>
  )
} 