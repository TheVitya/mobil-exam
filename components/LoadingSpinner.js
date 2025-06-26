import { View, ActivityIndicator, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

export default function LoadingSpinner({ message }) {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text style={styles.text}>{message || t("loading")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#6b7280",
  },
})
