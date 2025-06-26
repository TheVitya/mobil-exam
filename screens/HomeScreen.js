import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    scrollContent: {
      padding: 20,
    },
    header: {
      marginBottom: 30,
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textColorSecondary,
      textAlign: "center",
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      fontSize: 32,
      marginRight: 16,
    },
    cardText: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.textColorSecondary,
      lineHeight: 20,
    },
  })

  const dataCategories = [
    {
      title: t("titanicPassengers"),
      description: t("titanicPassengersDesc"),
      screen: ROUTES.PASSENGERS,
      icon: "🚢",
      color: colors.primary,
    },
    {
      title: t("peopleDirectory"),
      description: t("peopleDirectoryDesc"),
      screen: ROUTES.PEOPLE,
      icon: "👥",
      color: colors.primary, // fallback to primary for all, or define more in your theme
    },
    {
      title: t("weatherData"),
      description: t("weatherDataDesc"),
      screen: ROUTES.WEATHER,
      icon: "🌤️",
      color: colors.primary,
    },
    {
      title: t("irisDataset"),
      description: t("irisDatasetDesc"),
      screen: ROUTES.IRIS,
      icon: "🌸",
      color: colors.primary,
    },
    {
      title: t("housePricing"),
      description: t("housePricingDesc"),
      screen: ROUTES.HOUSE_PRICING,
      icon: "🏠",
      color: colors.primary,
    },
    {
      title: t("countries"),
      description: t("countriesDesc"),
      screen: ROUTES.COUNTRIES,
      icon: "🌍",
      color: colors.primary,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("dataExplorer")}</Text>
          <Text style={styles.subtitle}>{t("exploreDatasets")}</Text>
        </View>

        <View style={styles.gridColumn}>
          {dataCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: category.color }]}
              onPress={() => navigation.navigate(category.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <Text style={styles.icon}>{category.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                  <Text style={styles.cardDescription}>{category.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
