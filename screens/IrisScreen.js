import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedView from "../components/Themed/ThemedView"
import { useIris } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

const getVarietyColor = (variety, colors) => {
  switch (variety) {
    case "Setosa":
      return colors.primary
    case "Versicolor":
      return "#3b82f6"
    case "Virginica":
      return "#8b5cf6"
    default:
      return colors.textColorSecondary
  }
}

export default function IrisScreen() {
  const { data: iris, isLoading, error, refetch } = useIris()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    card: {
      backgroundColor: colors.cardColor,
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
    measurements: {
      gap: 16,
    },
    measurementGroup: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 8,
      padding: 12,
    },
    groupTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: 8,
    },
    measurement: {
      flex: 1,
    },
  })

  const renderIris = ({ item, index }) => (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.title}>{t("iris", { index: index + 1 })}</ThemedText>
        <ThemedView style={[styles.badge, { backgroundColor: getVarietyColor(item.variety, colors) }]}>
          <ThemedText style={styles.badgeText}>{item.variety}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.measurements}>
        <ThemedView style={styles.measurementGroup}>
          <ThemedText style={styles.groupTitle}>{t("sepal")}</ThemedText>
          <ThemedView style={styles.row}>
            <ThemedView style={styles.measurement}>
              <ThemedText style={styles.label}>{t("length")}</ThemedText>
              <ThemedText style={styles.infoValueLarge}>{item["sepal.length"]} cm</ThemedText>
            </ThemedView>
            <ThemedView style={styles.measurement}>
              <ThemedText style={styles.label}>{t("width")}</ThemedText>
              <ThemedText style={styles.infoValueLarge}>{item["sepal.width"]} cm</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.measurementGroup}>
          <ThemedText style={styles.groupTitle}>{t("petal")}</ThemedText>
          <ThemedView style={styles.row}>
            <ThemedView style={styles.measurement}>
              <ThemedText style={styles.label}>{t("length")}</ThemedText>
              <ThemedText style={styles.infoValueLarge}>{item["petal.length"]} cm</ThemedText>
            </ThemedView>
            <ThemedView style={styles.measurement}>
              <ThemedText style={styles.label}>{t("width")}</ThemedText>
              <ThemedText style={styles.infoValueLarge}>{item["petal.width"]} cm</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingIris")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={iris}
        renderItem={renderIris}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
