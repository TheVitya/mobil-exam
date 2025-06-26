import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useWeather } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function WeatherScreen() {
  const { data: weather, isLoading, error, refetch } = useWeather()

  const renderWeatherItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Day {index + 1}</Text>
        <View style={styles.tempRange}>
          <Text style={styles.minTemp}>{item.MinTemp}°</Text>
          <Text style={styles.tempSeparator}>/</Text>
          <Text style={styles.maxTemp}>{item.MaxTemp}°</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Rainfall</Text>
          <Text style={styles.value}>{item.Rainfall}mm</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Sunshine</Text>
          <Text style={styles.value}>{item.Sunshine}h</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Wind Gust</Text>
          <Text style={styles.value}>
            {item.WindGustSpeed}km/h {item.WindGustDir}
          </Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Humidity 9am</Text>
          <Text style={styles.value}>{item.Humidity9am}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Humidity 3pm</Text>
          <Text style={styles.value}>{item.Humidity3pm}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Pressure</Text>
          <Text style={styles.value}>{item.Pressure9am}hPa</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.rainBadge, { backgroundColor: item.RainTomorrow === "Yes" ? "#3b82f6" : "#10b981" }]}>
          <Text style={styles.rainText}>Rain Tomorrow: {item.RainTomorrow}</Text>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading weather data..." />
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
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  gridItem: {
    width: "50%",
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
  rainBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rainText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
})
