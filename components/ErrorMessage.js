import { useTranslation } from "react-i18next"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../providers/ThemeProvider"

export default function ErrorMessage({ error, onRetry }) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.textColor,
      marginBottom: 8,
      textAlign: "center",
    },
    message: {
      fontSize: 16,
      color: "#ef4444",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: colors.textColorTertiary,
      fontSize: 16,
      fontWeight: "600",
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("errorTitle")}</Text>
      <Text style={styles.message}>{error?.message || t("errorDefault")}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{t("tryAgain")}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
