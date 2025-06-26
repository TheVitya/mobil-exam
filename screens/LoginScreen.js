import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import { usePeople } from "../hooks/useDataQueries"
import { useUser } from "../providers/UserProvider"
import { colors } from "../styles"
import { ROUTES } from "../App"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const navigation = useNavigation()
  const { data: people, isLoading, error, refetch } = usePeople()
  const { login } = useUser()

  const handleLogin = () => {
    if (!people) return
    const user = people.find((p) => p.email.toLowerCase() === email.trim().toLowerCase())
    if (user) {
      login(user)
      navigation.reset({ index: 0, routes: [{ name: ROUTES.HOME }] })
    } else {
      Alert.alert("Login Failed", "No user found with that email.")
    }
  }

  if (isLoading) return <LoadingSpinner message="Loading people..." />
  if (error) return <ErrorMessage error={error} onRetry={refetch} />

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.hint}>Use an email from the json1.txt file.</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: colors.primary,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  hint: {
    marginTop: 16,
    color: colors.textColorSecondary,
    textAlign: "center",
  },
}) 