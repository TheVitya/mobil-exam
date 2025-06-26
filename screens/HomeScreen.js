import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet } from "react-native"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedTouchableOpacity from "../components/Themed/ThemedTouchableOpacity"
import ThemedView from "../components/Themed/ThemedView"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

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
    <ThemedSafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>{t("dataExplorer")}</ThemedText>
          <ThemedText style={styles.subtitle}>{t("exploreDatasets")}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.gridColumn}>
          {dataCategories.map((category, index) => (
            <ThemedTouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: category.color }]}
              onPress={() => navigation.navigate(category.screen)}
              activeOpacity={0.7}
            >
              <ThemedView style={styles.cardContent}>
                <ThemedText style={styles.icon}>{category.icon}</ThemedText>
                <ThemedView style={styles.cardText}>
                  <ThemedText style={styles.cardTitle}>{category.title}</ThemedText>
                  <ThemedText style={styles.cardDescription}>{category.description}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedTouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
  )
}
