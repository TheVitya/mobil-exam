import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
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
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("iris", { index: index + 1 })}</Text>
        <View style={[styles.badge, { backgroundColor: getVarietyColor(item.variety, colors) }]}>
          <Text style={styles.badgeText}>{item.variety}</Text>
        </View>
      </View>
      <View style={styles.measurements}>
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>{t("sepal")}</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <Text style={styles.label}>{t("length")}</Text>
              <Text style={styles.infoValueLarge}>{item["sepal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.label}>{t("width")}</Text>
              <Text style={styles.infoValueLarge}>{item["sepal.width"]} cm</Text>
            </View>
          </View>
        </View>
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>{t("petal")}</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <Text style={styles.label}>{t("length")}</Text>
              <Text style={styles.infoValueLarge}>{item["petal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.label}>{t("width")}</Text>
              <Text style={styles.infoValueLarge}>{item["petal.width"]} cm</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingIris")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={iris}
        renderItem={renderIris}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}
