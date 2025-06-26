import { Picker } from '@react-native-picker/picker'
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ErrorMessage from "../components/ErrorMessage"
import LoadingSpinner from "../components/LoadingSpinner"
import { usePassengers } from '../hooks/useDataQueries'
import { useTheme } from "../providers/ThemeProvider"
import { createSharedStyles } from "../styles"

export default function PassengersScreen() {
  const { data: passengers, isLoading, error, refetch } = usePassengers()
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [sortBy, setSortBy] = useState("Pclass")
  const [filterPclass, setFilterPclass] = useState("all")
  const [filterSurvived, setFilterSurvived] = useState("all")
  const [filterName, setFilterName] = useState("")

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
      const matchPclass = filterPclass === "all" || String(p.Pclass) === filterPclass
      const matchSurvived = filterSurvived === "all" || (filterSurvived === "survived" ? p.Survived : !p.Survived)
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
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.Name}</Text>
        <View style={[styles.badge, { backgroundColor: item.Survived ? colors.primary : colors.textColorSecondary }]}>
          <Text style={styles.badgeText}>{item.Survived ? t("survived") : t("didNotSurvive")}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.label}>{t("class")}</Text>
          <Text style={styles.value}>{item.Pclass}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("sex")}</Text>
          <Text style={styles.value}>{item.Sex}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("age")}</Text>
          <Text style={styles.value}>{item.Age || t("unknown")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("fare")}</Text>
          <Text style={styles.value}>${item.Fare ? item.Fare.toFixed(2) : t("na")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t("embarked")}</Text>
          <Text style={styles.value}>{item.Embarked || t("unknown")}</Text>
        </View>
      </View>
    </View>
  )

  if (isLoading) {
    return <LoadingSpinner message={t("loadingPassengers")} />
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>{t("class")}</Text>
          <Picker
            selectedValue={filterPclass}
            style={styles.picker}
            onValueChange={setFilterPclass}
          >
            <Picker.Item label={t("all")}
              value="all" />
            <Picker.Item label={t("one")}
              value="1" />
            <Picker.Item label={t("two")}
              value="2" />
            <Picker.Item label={t("three")}
              value="3" />
          </Picker>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>{t("survived")}</Text>
          <Picker
            selectedValue={filterSurvived}
            style={styles.picker}
            onValueChange={setFilterSurvived}
          >
            <Picker.Item label={t("all")} value="all" />
            <Picker.Item label={t("survived")} value="survived" />
            <Picker.Item label={t("didNotSurvive")} value="notSurvived" />
          </Picker>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>{t("nameLabel")}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={t("searchName")}
            value={filterName}
            onChangeText={setFilterName}
          />
        </View>
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>{t("sortBy")}</Text>
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
      </View>
      <FlatList
        data={sortedPassengers}
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
