import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>john.doe@example.com</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "500",
  },
}) 