import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, View, Text, SafeAreaView } from "react-native"
import { Card, DataRow, Badge, ErrorMessage, LoadingSpinner } from "../components"
import { useCountries } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

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
      marginRight: SPACING_UNIT * 1.5,
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
    timezone: {
      backgroundColor: colors.backgroundColor,
      borderRadius: SPACING_UNIT,
      padding: SPACING_UNIT * 1.5,
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
    <Card>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.titleInfo}>
            <Text style={styles.name}>{item.name}</Text>
            {item.native && <Text style={styles.native}>{item.native}</Text>}
          </View>
        </View>
        <View style={styles.codes}>
          <Badge 
            text={item.iso2} 
            color={colors.backgroundColor}
            size="small"
            textStyle={{ color: colors.textColorSecondary }}
          />
        </View>
      </View>
      
      <View style={styles.details}>
        <DataRow label={t("capital")} value={item.capital} />
        <DataRow 
          label={t("region")} 
          value={`${item.region}${item.subregion ? `, ${item.subregion}` : ""}`} 
        />
        <DataRow 
          label={t("currency")} 
          value={`${item.currency_name} (${item.currency_symbol})`} 
        />
        <DataRow label={t("phoneCode")} value={`+${item.phone_code}`} />
        <DataRow label={t("domain")} value={item.tld} />
      </View>
      
      {item.timezones && item.timezones.length > 0 && (
        <View style={styles.timezone}>
          <Text style={styles.timezoneTitle}>{t("timezone")}</Text>
          <Text style={styles.timezoneInfo}>
            {item.timezones[0]?.tzName} ({item.timezones[0]?.gmtOffsetName})
          </Text>
        </View>
      )}
    </Card>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingCountries")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderCountry}
        keyExtractor={(item) => item.id?.toString() || item.iso2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}
