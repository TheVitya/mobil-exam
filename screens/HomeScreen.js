import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"

const dataCategories = [
  {
    title: "Titanic Passengers",
    description: "Historical passenger data from the Titanic",
    screen: "Passengers",
    icon: "🚢",
    color: "#3b82f6",
  },
  {
    title: "People Directory",
    description: "User profiles with contact information",
    screen: "People",
    icon: "👥",
    color: "#10b981",
  },
  {
    title: "Weather Data",
    description: "Meteorological observations and forecasts",
    screen: "Weather",
    icon: "🌤️",
    color: "#f59e0b",
  },
  {
    title: "Iris Dataset",
    description: "Botanical measurements of iris flowers",
    screen: "Iris",
    icon: "🌸",
    color: "#ec4899",
  },
  {
    title: "House Pricing",
    description: "Real estate property information",
    screen: "HousePricing",
    icon: "🏠",
    color: "#8b5cf6",
  },
  {
    title: "Countries",
    description: "Global country information and details",
    screen: "Countries",
    icon: "🌍",
    color: "#ef4444",
  },
]

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Data Explorer</Text>
          <Text style={styles.subtitle}>Explore different datasets and visualizations</Text>
        </View>

        <View style={styles.grid}>
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
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
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
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
