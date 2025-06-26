import { useTranslation } from "react-i18next"
import { FlatList, Linking, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { Card, DataRow, ErrorMessage, LoadingSpinner } from "../components"
import { usePeople } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles, SPACING_UNIT } from "../styles"

export default function PeopleScreen() {
  const { data: people, isLoading, error, refetch } = usePeople()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    companyName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textColor,
      marginBottom: 4,
    },
    catchPhrase: {
      fontSize: 14,
      color: colors.textColorSecondary,
      fontStyle: "italic",
    },
    contactSection: {
      marginBottom: SPACING_UNIT * 2,
    },
    addressSection: {
      marginBottom: SPACING_UNIT * 2,
    },
    companySection: {
      marginBottom: SPACING_UNIT * 2,
    },
  })

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
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>@{item.username}</Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>{t("contact")}</Text>
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
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>{t("address")}</Text>
          <Text style={styles.smallText}>
            {item.address.suite}, {item.address.street}
          </Text>
          <Text style={styles.smallText}>
            {item.address.city}, {item.address.zipcode}
          </Text>
        </View>
      )}

      {item.company && (
        <View style={styles.companySection}>
          <Text style={styles.sectionTitle}>{t("company")}</Text>
          <Text style={styles.companyName}>{item.company.name}</Text>
          <Text style={styles.catchPhrase}>{item.company.catchPhrase}</Text>
        </View>
      )}
    </Card>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingPeople")} />
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
