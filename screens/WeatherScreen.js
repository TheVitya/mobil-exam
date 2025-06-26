import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import { useWeather } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function WeatherScreen() {
  const { data: weather, isLoading, error, refetch } = useWeather()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    tempRange: {
      flexDirection: "row",
      alignItems: "center",
    },
    minTemp: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "500",
    },
    tempSeparator: {
      fontSize: 16,
      color: colors.textColorSecondary,
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

  const renderWeatherItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("day", { index: index + 1 })}</Text>
        <View style={styles.tempRange}>
          <Text style={styles.minTemp}>{item.MinTemp}\u00b0</Text>
          <Text style={styles.tempSeparator}>/</Text>
          <Text style={styles.maxTemp}>{item.MaxTemp}\u00b0</Text>
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
        <View style={[styles.badge, { backgroundColor: item.RainTomorrow === "Yes" ? colors.primary : colors.textColorSecondary }]}>
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
