import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useWeather } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { sharedStyles } from "../styles"
import { useTranslation } from "react-i18next"

export default function WeatherScreen() {
  const { data: weather, isLoading, error, refetch } = useWeather()
  const { t } = useTranslation()

  const renderWeatherItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("day", { index: index + 1 })}</Text>
        <View style={styles.tempRange}>
          <Text style={styles.minTemp}>{item.MinTemp}°</Text>
          <Text style={styles.tempSeparator}>/</Text>
          <Text style={styles.maxTemp}>{item.MaxTemp}°</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("rainfall")}</Text>
          <Text style={styles.value}>{item.Rainfall}mm</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("sunshine")}</Text>
          <Text style={styles.value}>{item.Sunshine}h</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("windGust")}</Text>
          <Text style={styles.value}>
            {item.WindGustSpeed}km/h {item.WindGustDir}
          </Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("humidity9am")}</Text>
          <Text style={styles.value}>{item.Humidity9am}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("humidity3pm")}</Text>
          <Text style={styles.value}>{item.Humidity3pm}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>{t("pressure")}</Text>
          <Text style={styles.value}>{item.Pressure9am}hPa</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.badge, { backgroundColor: item.RainTomorrow === "Yes" ? "#3b82f6" : "#10b981" }]}>
          <Text style={styles.badgeText}>{t("rainTomorrow", { value: item.RainTomorrow })}</Text>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingWeather")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={weather}
        renderItem={renderWeatherItem}
        keyExtractor={(_, index) => index.toString()}
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
  tempRange: {
    flexDirection: "row",
    alignItems: "center",
  },
  minTemp: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "500",
  },
  tempSeparator: {
    fontSize: 16,
    color: "#6b7280",
    marginHorizontal: 4,
  },
  maxTemp: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
})
