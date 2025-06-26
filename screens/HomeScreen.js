import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ROUTES } from "../constants"
import { colors, sharedStyles } from "../styles"

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation()

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
      color: colors.secondary,
    },
    {
      title: t("weatherData"),
      description: t("weatherDataDesc"),
      screen: ROUTES.WEATHER,
      icon: "🌤️",
      color: colors.tertiary,
    },
    {
      title: t("irisDataset"),
      description: t("irisDatasetDesc"),
      screen: ROUTES.IRIS,
      icon: "🌸",
      color: colors.quaternary,
    },
    {
      title: t("housePricing"),
      description: t("housePricingDesc"),
      screen: ROUTES.HOUSE_PRICING,
      icon: "🏠",
      color: colors.quinary,
    },
    {
      title: t("countries"),
      description: t("countriesDesc"),
      screen: ROUTES.COUNTRIES,
      icon: "🌍",
      color: colors.senary,
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
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
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
    color: "#1f2937",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
})
