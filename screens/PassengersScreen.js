import { Picker } from '@react-native-picker/picker'
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, TextInput } from "react-native"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import ThemedSafeAreaView from "../components/Themed/ThemedSafeAreaView"
import ThemedText from "../components/Themed/ThemedText"
import ThemedView from "../components/Themed/ThemedView"
import { usePassengers } from "../hooks/useDataQueries"
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function PassengersScreen() {
  const { data: passengers, isLoading, error, refetch } = usePassengers()
  const [sortBy, setSortBy] = useState("Pclass")
  const [filterPclass, setFilterPclass] = useState("All")
  const [filterSurvived, setFilterSurvived] = useState("All")
  const [filterName, setFilterName] = useState("")
  const { t } = useTranslation()
  const { colors } = useTheme()

  const sharedStyles = createSharedStyles(colors)
  const styles = StyleSheet.create({
    ...sharedStyles,
    filterContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 4,
      backgroundColor: colors.backgroundColor,
      zIndex: 2,
    },
    filterItem: {
      flex: 1,
      minWidth: 120,
      marginRight: 8,
      marginBottom: 8,
    },
    filterLabel: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 2,
      color: colors.textColor,
    },
    textInput: {
      height: 40,
      borderColor: colors.textColorSecondary,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: colors.cardColor,
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 4,
      backgroundColor: colors.backgroundColor,
      zIndex: 1,
    },
    sortLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginRight: 8,
      color: colors.textColor,
    },
    picker: {
      flex: 1,
      height: 40,
    },
    details: {
      gap: 8,
    },
  })

  const filteredPassengers = useMemo(() => {
    if (!passengers) return []
    return passengers.filter((p) => {
      const matchPclass = filterPclass === t("all") || String(p.Pclass) === String(filterPclass)
      const matchSurvived = filterSurvived === t("all") || (filterSurvived === t("survived") ? p.Survived : !p.Survived)
      const matchName = p.Name.toLowerCase().includes(filterName.toLowerCase())
      return matchPclass && matchSurvived && matchName
    })
  }, [passengers, filterPclass, filterSurvived, filterName, t])

  const sortedPassengers = useMemo(() => {
    return [...filteredPassengers].sort((a, b) => {
      if (sortBy === "Pclass") return a.Pclass - b.Pclass
      if (sortBy === "Cabin") return (a.Cabin || "").localeCompare(b.Cabin || "")
      return a.Name.localeCompare(b.Name)
    })
  }, [filteredPassengers, sortBy])

  const renderPassenger = ({ item }) => (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.name}>{item.Name}</ThemedText>
        <ThemedView style={[styles.badge, { backgroundColor: item.Survived ? colors.primary : colors.textColorSecondary }]}>
          <ThemedText style={styles.badgeText}>{item.Survived ? t("survived") : t("didNotSurvive")}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.details}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("class")}</ThemedText>
          <ThemedText style={styles.value}>{item.Pclass}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("sex")}</ThemedText>
          <ThemedText style={styles.value}>{item.Sex}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("age")}</ThemedText>
          <ThemedText style={styles.value}>{item.Age || t("unknown")}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("fare")}</ThemedText>
          <ThemedText style={styles.value}>${item.Fare ? item.Fare.toFixed(2) : t("na")}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>{t("embarked")}</ThemedText>
          <ThemedText style={styles.value}>{item.Embarked || t("unknown")}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingPassengers")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.filterContainer}>
        <ThemedView style={styles.filterItem}>
          <ThemedText style={styles.filterLabel}>{t("class")}</ThemedText>
          <Picker
            selectedValue={filterPclass}
            style={styles.picker}
            onValueChange={setFilterPclass}
          >
            <Picker.Item label={t("all")}
              value={t("all")} />
            <Picker.Item label={t("one")}
              value={t("one")} />
            <Picker.Item label={t("two")}
              value={t("two")} />
            <Picker.Item label={t("three")}
              value={t("three")} />
          </Picker>
        </ThemedView>
        <ThemedView style={styles.filterItem}>
          <ThemedText style={styles.filterLabel}>{t("survived")}</ThemedText>
          <Picker
            selectedValue={filterSurvived}
            style={styles.picker}
            onValueChange={setFilterSurvived}
          >
            <Picker.Item label={t("all")} value={t("all")} />
            <Picker.Item label={t("survived")} value={t("survived")} />
            <Picker.Item label={t("didNotSurvive")} value={t("didNotSurvive")} />
          </Picker>
        </ThemedView>
        <ThemedView style={styles.filterItem}>
          <ThemedText style={styles.filterLabel}>{t("nameLabel")}</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder={t("searchName")}
            value={filterName}
            onChangeText={setFilterName}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.sortContainer}>
        <ThemedText style={styles.sortLabel}>{t("sortBy")}</ThemedText>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label={t("class")}
            value="Pclass" />
          <Picker.Item label={t("cabin")}
            value="Cabin" />
          <Picker.Item label={t("nameSort")}
            value="Name" />
        </Picker>
      </ThemedView>
      <FlatList
        data={sortedPassengers}
        renderItem={renderPassenger}
        keyExtractor={(item, index) => item.PassengerId?.toString() || index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </ThemedSafeAreaView>
  )
}
