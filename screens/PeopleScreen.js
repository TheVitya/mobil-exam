import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking } from "react-native"
import { usePeople } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function PeopleScreen() {
  const { data: people, isLoading, error, refetch } = usePeople()

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  const handleWebsitePress = (website) => {
    Linking.openURL(`https://${website}`)
  }

  const renderPerson = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity onPress={() => handleEmailPress(item.email)}>
          <Text style={styles.link}>{item.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePhonePress(item.phone)}>
          <Text style={styles.link}>{item.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleWebsitePress(item.website)}>
          <Text style={styles.link}>{item.website}</Text>
        </TouchableOpacity>
      </View>

      {item.address && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.text}>
            {item.address.suite}, {item.address.street}
          </Text>
          <Text style={styles.text}>
            {item.address.city}, {item.address.zipcode}
          </Text>
        </View>
      )}

      {item.company && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.companyName}>{item.company.name}</Text>
          <Text style={styles.catchPhrase}>{item.company.catchPhrase}</Text>
        </View>
      )}
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading people..." />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={people}
        renderItem={renderPerson}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  link: {
    fontSize: 14,
    color: "#3b82f6",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 4,
  },
  catchPhrase: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
})
