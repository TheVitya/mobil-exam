import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { Card, Badge, DataRow, ErrorMessage, LoadingSpinner } from "../components"
import { useIris } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

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
    measurements: {
      gap: SPACING_UNIT * 2,
    },
    measurementGroup: {
      backgroundColor: colors.backgroundColor,
      borderRadius: SPACING_UNIT,
      padding: SPACING_UNIT * 1.5,
    },
    groupTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textColor,
      marginBottom: SPACING_UNIT,
    },
    measurement: {
      flex: 1,
    },
  })

  const renderIris = ({ item, index }) => (
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t("iris", { index: index + 1 })}</Text>
        <Badge 
          text={item.variety}
          color={getVarietyColor(item.variety, colors)}
        />
      </View>
      
      <View style={styles.measurements}>
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>{t("sepal")}</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <DataRow label={t("length")} value={`${item["sepal.length"]} cm`} />
            </View>
            <View style={styles.measurement}>
              <DataRow label={t("width")} value={`${item["sepal.width"]} cm`} />
            </View>
          </View>
        </View>
        
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>{t("petal")}</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <DataRow label={t("length")} value={`${item["petal.length"]} cm`} />
            </View>
            <View style={styles.measurement}>
              <DataRow label={t("width")} value={`${item["petal.width"]} cm`} />
            </View>
          </View>
        </View>
      </View>
    </Card>
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
