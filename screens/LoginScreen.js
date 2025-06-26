import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Input, ScreenHeader, ErrorMessage, LoadingSpinner } from "../components"
import { ROUTES } from "../constants"
import { usePeople } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { useUser } from "../providers/UserProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

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
      padding: SPACING_UNIT * 3,
      backgroundColor: colors.backgroundColor,
    },
    hint: {
      marginTop: SPACING_UNIT * 2,
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
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title="Login" 
        titleStyle={{ color: colors.primary }}
      />
      
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Button 
        title="Login" 
        onPress={handleLogin}
        disabled={!email.trim()}
      />
      
      <Text style={styles.hint}>Use an email from the json1.txt file.</Text>
    </SafeAreaView>
  )
} 