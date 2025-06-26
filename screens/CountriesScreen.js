import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedView from "../components/Themed/ThemedView"
import { useCountries } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function CountriesScreen() {
  const { data: countries, isLoading, error, refetch } = useCountries()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    emoji: {
      fontSize: 32,
      marginRight: 12,
    },
    titleInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.textColor,
      marginBottom: 2,
    },
    native: {
      fontSize: 14,
      color: colors.textColorSecondary,
    },
    codes: {
      alignItems: "flex-end",
    },
    iso: {
      fontSize: 12,
      color: colors.textColorSecondary,
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    details: {
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    value: {
      fontSize: 14,
      color: colors.textColor,
      flex: 1,
      textAlign: "right",
    },
    timezone: {
      backgroundColor: colors.cardColor,
      borderRadius: 8,
      padding: 12,
    },
    timezoneTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: 4,
    },
    timezoneInfo: {
      fontSize: 12,
      color: colors.textColorSecondary,
    },
  })

  const renderCountry = ({ item }) => (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedView style={styles.titleRow}>
          <ThemedText style={styles.emoji}>{item.emoji}</ThemedText>
          <ThemedView style={styles.titleInfo}>
            <ThemedText style={styles.name}>{item.name}</ThemedText>
            {item.native && <ThemedText style={styles.native}>{item.native}</ThemedText>}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.codes}>
          <ThemedText style={styles.iso}>{item.iso2}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.details}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("capital")}</ThemedText>
          <ThemedText style={styles.value}>{item.capital}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("region")}</ThemedText>
          <ThemedText style={styles.value}>
            {item.region}
            {item.subregion ? `, ${item.subregion}` : ""}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("currency")}</ThemedText>
          <ThemedText style={styles.value}>
            {item.currency_name} ({item.currency_symbol})
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("phoneCode")}</ThemedText>
          <ThemedText style={styles.value}>+{item.phone_code}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("domain")}</ThemedText>
          <ThemedText style={styles.value}>{item.tld}</ThemedText>
        </ThemedView>
      </ThemedView>
      {item.timezones && item.timezones.length > 0 && (
        <ThemedView style={styles.timezone}>
          <ThemedText style={styles.timezoneTitle}>{t("timezone")}</ThemedText>
          <ThemedText style={styles.timezoneInfo}>
            {item.timezones[0]?.tzName} ({item.timezones[0]?.gmtOffsetName})
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingCountries")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }
  
  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderCountry}
        keyExtractor={(item) => item.id?.toString() || item.iso2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
