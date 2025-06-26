import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import { useHousePricing } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function HousePricingScreen() {
  const { data: houses, isLoading, error, refetch } = useHousePricing()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    basicInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      backgroundColor: colors.backgroundColor,
      borderRadius: 8,
      padding: 12,
    },
    infoItem: {
      alignItems: "center",
    },
    infoLabel: {
      fontSize: 12,
      color: colors.textColorSecondary,
    },
    features: {
      marginTop: 8,
    },
    featuresTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textColor,
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
            { backgroundColor: item.furnishingstatus === "furnished" ? colors.primary : colors.textColorSecondary },
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
            <Text style={[styles.text, { color: item.mainroad === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.mainroad === "yes" ? "\u2713" : "\u2717"} {t("mainRoad")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.guestroom === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.guestroom === "yes" ? "\u2713" : "\u2717"} {t("guestRoom")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.basement === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.basement === "yes" ? "\u2713" : "\u2717"} {t("basement")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.airconditioning === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.airconditioning === "yes" ? "\u2713" : "\u2717"} {t("ac")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.hotwaterheating === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.hotwaterheating === "yes" ? "\u2713" : "\u2717"} {t("hotWater")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.prefarea === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.prefarea === "yes" ? "\u2713" : "\u2717"} {t("preferredArea")}
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
