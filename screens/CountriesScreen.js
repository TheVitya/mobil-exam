import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useCountries } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { sharedStyles } from "../styles"

export default function CountriesScreen() {
  const { data: countries, isLoading, error, refetch } = useCountries()

  const renderCountry = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.titleInfo}>
            <Text style={styles.name}>{item.name}</Text>
            {item.native && <Text style={styles.native}>{item.native}</Text>}
          </View>
        </View>
        <View style={styles.codes}>
          <Text style={styles.iso}>{item.iso2}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Capital:</Text>
          <Text style={styles.value}>{item.capital}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Region:</Text>
          <Text style={styles.value}>
            {item.region}
            {item.subregion ? `, ${item.subregion}` : ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Currency:</Text>
          <Text style={styles.value}>
            {item.currency_name} ({item.currency_symbol})
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Code:</Text>
          <Text style={styles.value}>+{item.phone_code}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Domain:</Text>
          <Text style={styles.value}>{item.tld}</Text>
        </View>
      </View>

      {item.timezones && item.timezones.length > 0 && (
        <View style={styles.timezone}>
          <Text style={styles.timezoneTitle}>Timezone</Text>
          <Text style={styles.timezoneInfo}>
            {item.timezones[0]?.tzName} ({item.timezones[0]?.gmtOffsetName})
          </Text>
        </View>
      )}
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading countries..." />
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
    color: "#1f2937",
    marginBottom: 2,
  },
  native: {
    fontSize: 14,
    color: "#6b7280",
  },
  codes: {
    alignItems: "flex-end",
  },
  iso: {
    fontSize: 12,
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
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
    color: "#1f2937",
    flex: 1,
    textAlign: "right",
  },
  timezone: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
  },
  timezoneTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  timezoneInfo: {
    fontSize: 12,
    color: "#6b7280",
  },
})
