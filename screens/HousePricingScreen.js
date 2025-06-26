import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedView from "../components/Themed/ThemedView"
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
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.title}>{formatPrice(item.price)}</ThemedText>
        <ThemedView
          style={[
            styles.badge,
            { backgroundColor: item.furnishingstatus === "furnished" ? colors.primary : colors.textColorSecondary },
          ]}
        >
          <ThemedText style={styles.badgeText}>{item.furnishingstatus}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.basicInfo}>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoValueLarge}>{item.bedrooms}</ThemedText>
          <ThemedText style={styles.infoLabel}>{t("bedrooms")}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoValueLarge}>{item.bathrooms}</ThemedText>
          <ThemedText style={styles.infoLabel}>{t("bathrooms")}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoValueLarge}>{item.stories}</ThemedText>
          <ThemedText style={styles.infoLabel}>{t("stories")}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoValueLarge}>{item.area}</ThemedText>
          <ThemedText style={styles.infoLabel}>{t("sqFt")}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.features}>
        <ThemedText style={styles.featuresTitle}>{t("features")}</ThemedText>
        <ThemedView style={styles.featureGrid}>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.mainroad === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.mainroad === "yes" ? "\u2713" : "\u2717"} {t("mainRoad")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.guestroom === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.guestroom === "yes" ? "\u2713" : "\u2717"} {t("guestRoom")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.basement === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.basement === "yes" ? "\u2713" : "\u2717"} {t("basement")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.airconditioning === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.airconditioning === "yes" ? "\u2713" : "\u2717"} {t("ac")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.hotwaterheating === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.hotwaterheating === "yes" ? "\u2713" : "\u2717"} {t("hotWater")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <ThemedText style={[styles.text, { color: item.prefarea === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.prefarea === "yes" ? "\u2713" : "\u2717"} {t("preferredArea")}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.text}>{t("parking", { count: item.parking })}</ThemedText>
      </ThemedView>
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingHouse")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={houses}
        renderItem={renderHouse}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
