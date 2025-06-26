import { useTranslation } from "react-i18next"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../providers/ThemeProvider"

export default function LoadingSpinner({ message }) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    text: {
      marginTop: 16,
      fontSize: 16,
      color: colors.textColorSecondary,
    },
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message || t("loading")}</Text>
    </View>
  )
}
