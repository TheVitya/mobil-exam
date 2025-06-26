import { useTranslation } from "react-i18next"
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { ROUTES } from "../constants"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card, ScreenHeader } from "../components"

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    scrollContent: {
      padding: SPACING_UNIT * 2.5,
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      fontSize: 32,
      marginRight: SPACING_UNIT * 2,
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
      color: colors.primary,
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
    {
      title: t("aboutOurSchool"),
      screen: ROUTES.ABOUT_SCHOOL,
      icon: "🏫",
      color: colors.primary,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title={t("dataExplorer")}
          subtitle={t("exploreDatasets")}
        />

        <View style={styles.gridColumn}>
          {dataCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(category.screen)}
              activeOpacity={0.7}
            >
              <Card style={{ borderLeftColor: category.color, borderLeftWidth: 4 }}>
                <View style={styles.cardContent}>
                  <Text style={styles.icon}>{category.icon}</Text>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{category.title}</Text>
                    {category.description && <Text style={styles.cardDescription}>{category.description}</Text>}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
