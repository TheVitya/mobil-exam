import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { usePassengers } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function PassengersScreen() {
  const { data: passengers, isLoading, error, refetch } = usePassengers()

  const renderPassenger = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.Name}</Text>
        <View style={[styles.survivedBadge, { backgroundColor: item.Survived ? "#10b981" : "#ef4444" }]}>
          <Text style={styles.survivedText}>{item.Survived ? "Survived" : "Did not survive"}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>Class:</Text>
          <Text style={styles.value}>{item.Pclass}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sex:</Text>
          <Text style={styles.value}>{item.Sex}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{item.Age || "Unknown"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fare:</Text>
          <Text style={styles.value}>${item.Fare ? item.Fare.toFixed(2) : "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Embarked:</Text>
          <Text style={styles.value}>{item.Embarked || "Unknown"}</Text>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading passengers..." />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={passengers}
        renderItem={renderPassenger}
        keyExtractor={(item, index) => item.PassengerId?.toString() || index.toString()}
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
    alignItems: "flex-start",
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    marginRight: 8,
  },
  survivedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  survivedText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  details: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "400",
  },
})
