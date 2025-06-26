import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useHousePricing } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function HousePricingScreen() {
  const { data: houses, isLoading, error, refetch } = useHousePricing()

  const formatPrice = (price) => {
    const numPrice = typeof price === "string" ? Number.parseInt(price) : price
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(numPrice)
  }

  const renderHouse = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.furnishingstatus === "furnished" ? "#10b981" : "#f59e0b" },
          ]}
        >
          <Text style={styles.statusText}>{item.furnishingstatus}</Text>
        </View>
      </View>

      <View style={styles.basicInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.bedrooms}</Text>
          <Text style={styles.infoLabel}>Bedrooms</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.bathrooms}</Text>
          <Text style={styles.infoLabel}>Bathrooms</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.stories}</Text>
          <Text style={styles.infoLabel}>Stories</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.area}</Text>
          <Text style={styles.infoLabel}>Sq Ft</Text>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Features</Text>
        <View style={styles.featureGrid}>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.mainroad === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.mainroad === "yes" ? "✓" : "✗"} Main Road
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.guestroom === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.guestroom === "yes" ? "✓" : "✗"} Guest Room
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.basement === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.basement === "yes" ? "✓" : "✗"} Basement
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.airconditioning === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.airconditioning === "yes" ? "✓" : "✗"} A/C
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.hotwaterheating === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.hotwaterheating === "yes" ? "✓" : "✗"} Hot Water
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureText, { color: item.prefarea === "yes" ? "#10b981" : "#ef4444" }]}>
              {item.prefarea === "yes" ? "✓" : "✗"} Preferred Area
            </Text>
          </View>
        </View>
        <Text style={styles.parkingInfo}>Parking: {item.parking} spaces</Text>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading house data..." />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={houses}
        renderItem={renderHouse}
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
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
  },
  infoItem: {
    alignItems: "center",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  features: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  feature: {
    width: "50%",
    paddingVertical: 2,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
  },
  parkingInfo: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
})
