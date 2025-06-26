import { useTranslation } from "react-i18next"
import { FlatList, Linking, StyleSheet } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedTouchableOpacity from "../components/Themed/ThemedTouchableOpacity"
import ThemedView from "../components/Themed/ThemedView"
import { usePeople } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function PeopleScreen() {
  const { data: people, isLoading, error, refetch } = usePeople()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    companyName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textColor,
      marginBottom: 4,
    },
    catchPhrase: {
      fontSize: 14,
      color: colors.textColorSecondary,
      fontStyle: "italic",
    },
  })

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  const handleWebsitePress = (website) => {
    Linking.openURL(`https://${website}`)
  }

  const renderPerson = ({ item }) => (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.title}>{item.name}</ThemedText>
        <ThemedText style={styles.subtitle}>@{item.username}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{t("contact")}</ThemedText>
        <ThemedTouchableOpacity onPress={() => handleEmailPress(item.email)}>
          <ThemedText style={styles.link}>{item.email}</ThemedText>
        </ThemedTouchableOpacity>
        <ThemedTouchableOpacity onPress={() => handlePhonePress(item.phone)}>
          <ThemedText style={styles.link}>{item.phone}</ThemedText>
        </ThemedTouchableOpacity>
        <ThemedTouchableOpacity onPress={() => handleWebsitePress(item.website)}>
          <ThemedText style={styles.link}>{item.website}</ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>

      {item.address && (
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t("address")}</ThemedText>
          <ThemedText style={styles.text}>
            {item.address.suite}, {item.address.street}
          </ThemedText>
          <ThemedText style={styles.text}>
            {item.address.city}, {item.address.zipcode}
          </ThemedText>
        </ThemedView>
      )}

      {item.company && (
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{t("company")}</ThemedText>
          <ThemedText style={styles.companyName}>{item.company.name}</ThemedText>
          <ThemedText style={styles.catchPhrase}>{item.company.catchPhrase}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingPeople")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={people}
        renderItem={renderPerson}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
