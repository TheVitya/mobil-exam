import { StyleSheet, FlatList } from "react-native"
import { useWeather } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { useTranslation } from "react-i18next"
import ThemedView from "../components/Themed/ThemedView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
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
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.title}>{t("day", { index: index + 1 })}</ThemedText>
        <ThemedView style={styles.tempRange}>
          <ThemedText style={styles.minTemp}>{item.MinTemp}\u00b0</ThemedText>
          <ThemedText style={styles.tempSeparator}>/</ThemedText>
          <ThemedText style={styles.maxTemp}>{item.MaxTemp}\u00b0</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.grid}>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("rainfall")}</ThemedText>
          <ThemedText style={styles.value}>{item.Rainfall}mm</ThemedText>
        </ThemedView>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("sunshine")}</ThemedText>
          <ThemedText style={styles.value}>{item.Sunshine}h</ThemedText>
        </ThemedView>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("windGust")}</ThemedText>
          <ThemedText style={styles.value}>
            {item.WindGustSpeed}km/h {item.WindGustDir}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("humidity9am")}</ThemedText>
          <ThemedText style={styles.value}>{item.Humidity9am}%</ThemedText>
        </ThemedView>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("humidity3pm")}</ThemedText>
          <ThemedText style={styles.value}>{item.Humidity3pm}%</ThemedText>
        </ThemedView>
        <ThemedView style={styles.gridItem}>
          <ThemedText style={styles.label}>{t("pressure")}</ThemedText>
          <ThemedText style={styles.value}>{item.Pressure9am}hPa</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.footer}>
        <ThemedView style={[styles.badge, { backgroundColor: item.RainTomorrow === "Yes" ? colors.primary : colors.textColorSecondary }]}>
          <ThemedText style={styles.badgeText}>{t("rainTomorrow", { value: item.RainTomorrow })}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingWeather")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={weather}
        renderItem={renderWeatherItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
