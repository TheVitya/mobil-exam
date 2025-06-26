import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useIris } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

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
      <View style={styles.header}>
        <Text style={styles.title}>Iris #{index + 1}</Text>
        <View style={[styles.varietyBadge, { backgroundColor: getVarietyColor(item.variety) }]}>
          <Text style={styles.varietyText}>{item.variety}</Text>
        </View>
      </View>

      <View style={styles.measurements}>
        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>Sepal</Text>
          <View style={styles.measurementRow}>
            <View style={styles.measurement}>
              <Text style={styles.measurementLabel}>Length</Text>
              <Text style={styles.measurementValue}>{item["sepal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measurementLabel}>Width</Text>
              <Text style={styles.measurementValue}>{item["sepal.width"]} cm</Text>
            </View>
          </View>
        </View>

        <View style={styles.measurementGroup}>
          <Text style={styles.groupTitle}>Petal</Text>
          <View style={styles.measurementRow}>
            <View style={styles.measurement}>
              <Text style={styles.measurementLabel}>Length</Text>
              <Text style={styles.measurementValue}>{item["petal.length"]} cm</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measurementLabel}>Width</Text>
              <Text style={styles.measurementValue}>{item["petal.width"]} cm</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  varietyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  varietyText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
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
  measurementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measurement: {
    flex: 1,
  },
  measurementLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  measurementValue: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
})
