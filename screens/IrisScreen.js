import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useIris } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { sharedStyles } from "../styles"

const getVarietyColor = (variety) => {
  switch (variety) {
    case "Setosa":
      return "#10b981"
    case "Versicolor":
      return "#3b82f6"
    case "Virginica":
      return "#8b5cf6"
    default:
      return "#6b7280"
  }
}

export default function IrisScreen() {
  const { data: iris, isLoading, error, refetch } = useIris()

  const renderIris = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Iris #{index + 1}</Text>
        <View style={[styles.badge, { backgroundColor: getVarietyColor(item.variety) }]}>
          <Text style={styles.badgeText}>{item.variety}</Text>
        </View>
      </View>

      <View style={styles.measurements}>
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>Sepal</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <Text style={styles.label}>Length</Text>
              <Text style={styles.infoValueLarge}>{item["sepal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.label}>Width</Text>
              <Text style={styles.infoValueLarge}>{item["sepal.width"]} cm</Text>
            </View>
          </View>
        </View>

        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>Petal</Text>
          <View style={styles.row}>
            <View style={styles.measurement}>
              <Text style={styles.label}>Length</Text>
              <Text style={styles.infoValueLarge}>{item["petal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.label}>Width</Text>
              <Text style={styles.infoValueLarge}>{item["petal.width"]} cm</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading iris data..." />
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

const styles = StyleSheet.create({
  ...sharedStyles,
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
  measurements: {
    gap: 16,
  },
  measurementGroup: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  measurement: {
    flex: 1,
  },
})
