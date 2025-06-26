import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native"
import { Card, DataRow, Badge, ErrorMessage, LoadingSpinner } from "../components"
import { useWeather } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

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
      marginTop: SPACING_UNIT,
    },
  })

  const renderWeatherItem = ({ item, index }) => (
    <Card>
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
          <DataRow label={t("rainfall")} value={`${item.Rainfall}mm`} />
        </View>
        <View style={styles.gridItem}>
          <DataRow label={t("sunshine")} value={`${item.Sunshine}h`} />
        </View>
        <View style={styles.gridItem}>
          <DataRow 
            label={t("windGust")} 
            value={`${item.WindGustSpeed}km/h ${item.WindGustDir}`} 
          />
        </View>
        <View style={styles.gridItem}>
          <DataRow label={t("humidity9am")} value={`${item.Humidity9am}%`} />
        </View>
        <View style={styles.gridItem}>
          <DataRow label={t("humidity3pm")} value={`${item.Humidity3pm}%`} />
        </View>
        <View style={styles.gridItem}>
          <DataRow label={t("pressure")} value={`${item.Pressure9am}hPa`} />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Badge 
          text={t("rainTomorrow", { value: item.RainTomorrow })}
          color={item.RainTomorrow === "Yes" ? colors.primary : colors.textColorSecondary}
        />
      </View>
    </Card>
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
