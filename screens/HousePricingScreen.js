import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useHousePricing } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { sharedStyles } from "../styles"
import { useTranslation } from "react-i18next"

export default function HousePricingScreen() {
  const { data: houses, isLoading, error, refetch } = useHousePricing()
  const { t } = useTranslation()

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>{formatPrice(item.price)}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: item.furnishingstatus === "furnished" ? "#10b981" : "#f59e0b" },
          ]}
        >
          <Text style={styles.badgeText}>{item.furnishingstatus}</Text>
        </View>
      </View>

      <View style={styles.basicInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValueLarge}>{item.bedrooms}</Text>
          <Text style={styles.infoLabel}>{t("bedrooms")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValueLarge}>{item.bathrooms}</Text>
          <Text style={styles.infoLabel}>{t("bathrooms")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValueLarge}>{item.stories}</Text>
          <Text style={styles.infoLabel}>{t("stories")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValueLarge}>{item.area}</Text>
          <Text style={styles.infoLabel}>{t("sqFt")}</Text>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>{t("features")}</Text>
        <View style={styles.featureGrid}>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.mainroad === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.mainroad === "yes" ? "✓" : "✗"} {t("mainRoad")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.guestroom === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.guestroom === "yes" ? "✓" : "✗"} {t("guestRoom")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.basement === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.basement === "yes" ? "✓" : "✗"} {t("basement")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.airconditioning === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.airconditioning === "yes" ? "✓" : "✗"} {t("ac")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.hotwaterheating === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.hotwaterheating === "yes" ? "✓" : "✗"} {t("hotWater")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.prefarea === "yes" ? "#10b981" : "#ef4444" }]}> 
              {item.prefarea === "yes" ? "✓" : "✗"} {t("preferredArea")}
            </Text>
          </View>
        </View>
        <Text style={styles.text}>{t("parking", { count: item.parking })}</Text>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingHouse")} />
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
  ...sharedStyles,
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
})
