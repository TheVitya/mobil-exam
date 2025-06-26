import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking } from "react-native"
import { usePeople } from "../hooks/useDataQueries"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import { sharedStyles } from "../styles"

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>@{item.username}</Text>
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
  ...sharedStyles,
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
