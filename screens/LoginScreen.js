import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, Button, StyleSheet, TextInput } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import { ROUTES } from "../constants"
import { usePeople } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles } from "../styles"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const navigation = useNavigation()
  const { data: people, isLoading, error, refetch } = usePeople()
  const { login } = useUser()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: colors.backgroundColor,
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
      color: colors.textColor,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.textColorSecondary,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      backgroundColor: colors.cardColor,
      color: colors.textColor,
    },
    hint: {
      marginTop: 16,
      color: colors.textColorSecondary,
      textAlign: "center",
    },
  })

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

  if (isLoading) {
    return <LoadingSpinner message="Loading people..." />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>
      <ThemedText style={styles.label}>Email</ThemedText>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor={colors.textColorSecondary}
      />
      <Button title="Login" onPress={handleLogin} color={colors.primary} />
      <ThemedText style={styles.hint}>Use an email from the json1.txt file.</ThemedText>
    </ThemedSafeAreaView>
  )
} 