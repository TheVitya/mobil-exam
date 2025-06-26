import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { Card, Badge, DataRow, ErrorMessage, LoadingSpinner } from "../components"
import { useHousePricing } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

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
      marginBottom: SPACING_UNIT * 2,
      backgroundColor: colors.backgroundColor,
      borderRadius: SPACING_UNIT,
      padding: SPACING_UNIT * 1.5,
    },
    infoItem: {
      alignItems: "center",
    },
    infoLabel: {
      fontSize: 12,
      color: colors.textColorSecondary,
    },
    features: {
      marginTop: SPACING_UNIT,
    },
    featuresTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: SPACING_UNIT,
    },
    featureGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: SPACING_UNIT,
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
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{formatPrice(item.price)}</Text>
        <Badge 
          text={t(item.furnishingstatus.toLowerCase())}
          color={item.furnishingstatus === "furnished" ? colors.primary : colors.textColorSecondary}
        />
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
              {item.mainroad === "yes" ? "✓" : "✗"} {t("mainRoad")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.guestroom === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.guestroom === "yes" ? "✓" : "✗"} {t("guestRoom")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.basement === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.basement === "yes" ? "✓" : "✗"} {t("basement")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.airconditioning === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.airconditioning === "yes" ? "✓" : "✗"} {t("ac")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.hotwaterheating === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.hotwaterheating === "yes" ? "✓" : "✗"} {t("hotWater")}
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.text, { color: item.prefarea === "yes" ? colors.primary : colors.textColorSecondary }]}>
              {item.prefarea === "yes" ? "✓" : "✗"} {t("preferredArea")}
            </Text>
          </View>
        </View>
        <Text style={styles.smallText}>{t("parking", { count: item.parking })}</Text>
      </View>
    </Card>
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
